import app from "../app";
import request from "supertest";

describe("POST /auth/signup", () => {
  it("return truthy", () => {
    expect(3).toBeTruthy();
  });
});

describe("POST /auth/signup", () => {
  it("return a status of 200 when successful", async () => {
    const res = await request(app).post("/auth/signup").send({
      email: "AdeOmo@gmail.com",
      first_name: "Ade",
      last_name: "Omo",
      password: "123456",
      phoneNumber: "08168029970",
      address: "No 7b Agape close woji port harcourt",
      is_admin: false,
    });
    expect(res.statusCode).toBe(201);
  });
});
