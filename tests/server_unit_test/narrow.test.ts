import request from "supertest";
import {
  app,
  connection,
  validateEmail,
  validatePassword,
  generateToken,
} from "@/server/server";

let server: any;

beforeAll((done) => {
  server = app.listen(0, () => {
    console.log(
      `Server is running on http://localhost:${server.address().port}`
    );
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

test("SignUp_MissingPassword_ReturnsBadRequest", async () => {
  const response = await request(app)
    .post("/api/signup")
    .send({ firstName: "John", lastName: "Doe", email: "johndoe@me.com" });
  expect(response.status).toBe(400);
  expect(response.text).toBe("Password is required");
});
