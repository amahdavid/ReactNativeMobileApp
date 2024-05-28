import request from "supertest";
import { app, connection } from "@/app_server/server";
import {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
} from "../test_utils/functions";

let server: any;

beforeAll((done) => {
  server = app.listen(0, () => {
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Server closed");
    connection.end(() => {
      console.log("Database connection closed");
      done();
    });
  });
});

test("SignUp_ValidData_HappyPath", async () => {
  const testData = {
    firstName: generateRandomString(8),
    lastName: generateRandomString(8),
    email: generateRandomEmail(),
    password: generateRandomPassword(),
  };

  const response = await request(app).post("/api/signup").send(testData);
  const responseBody = response.body;

  expect(response.status).toBe(201);
  expect(responseBody.token).toBeDefined();
  expect(responseBody.response.id).toBeDefined();

  expect(responseBody.response.firstName).toBe(testData.firstName);
  expect(responseBody.response.lastName).toBe(testData.lastName);
  expect(responseBody.response.email).toBe(testData.email);
});

test("SignUp_MissingPassword_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      firstName: generateRandomString(8),
      lastName: generateRandomString(8),
      email: generateRandomEmail(),
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Password is required");
});
