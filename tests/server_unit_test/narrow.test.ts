import request from "supertest";
import {
  app,
  connection,
  validateEmail,
  validatePassword,
  generateToken,
} from "@/server/server";

import { v4 as uuidv4 } from 'uuid';

test('uuid import test', () => {
  const id = uuidv4();
  console.log(id);
  expect(id).toBeDefined();
});

test("SignUp_MissingPassword_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({ firstName: "John", lastName: "Doe", email: "johndoe@me.com" });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Password is required");
});
