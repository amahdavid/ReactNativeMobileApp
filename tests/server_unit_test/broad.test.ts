import request from "supertest";
import { app, connection } from "../../app_server/server";
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

test("SignUpAndLogin_ValidData_HappyPath", async () => {
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

  const loginResponse = await request(app)
    .post("/api/signin")
    .send({ email: testData.email, password: testData.password });
  console.log("Signin response:", loginResponse.body);

  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body.token).toBeDefined();
  expect(loginResponse.body.response.email).toBe(testData.email);
});
