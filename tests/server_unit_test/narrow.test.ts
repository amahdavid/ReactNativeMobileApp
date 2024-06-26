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

test("SignUp_MissingEmail_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      firstName: generateRandomString(8),
      lastName: generateRandomString(8),
      password: generateRandomPassword(),
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Email is required");
});

test("SignUp_MissingFirstName_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      lastName: generateRandomString(8),
      email: generateRandomEmail(),
      password: generateRandomPassword(),
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("First name is required");
});

test("SignUp_MissingLastName_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      firstName: generateRandomString(8),
      email: generateRandomEmail(),
      password: generateRandomPassword(),
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Last name is required");
});

test("SignUp_InvalidEmail_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      firstName: generateRandomString(8),
      lastName: generateRandomString(8),
      email: "invalidemail",
      password: generateRandomPassword(),
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Invalid email address");
});

test("SignUp_BadPassword_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({
      firstName: generateRandomString(8),
      lastName: generateRandomString(8),
      email: generateRandomEmail(),
      password: "123",
    });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Password must contain at least 8 characters, including letters and numbers");
});

test("SignIn_MissingEmail_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signin")
    .send({
      password: generateRandomPassword(),
    });
  expect(response.status).toBe(400);
});