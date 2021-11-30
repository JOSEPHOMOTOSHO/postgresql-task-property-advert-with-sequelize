import app from "../app";
import request from "supertest";

describe("Users API", () => {
  it("should return a status of 201 when user is successfully returned", async () => {
    const res =  await request(app).post("/auth/signup").send({
      email: "calOmotest@gmail.com",
      first_name: "Ade",
      last_name: "Omo",
      password: "123456",
      phoneNumber: "08168029970",
      address: "No 7b Agape close woji port harcourt",
      is_admin: false,
    });
    expect(res.statusCode).toBe(201);
  }),

  it("should return a status of 200 on successful login",async()=>{
    const res =  await request(app).post("/auth/login").send({
      email: "calOmotest@gmail.com",
      password: "123456",
    });
     expect(res.statusCode).toBe(200);
  })

  it("should return a status of 400 on unsuccessful login",async()=>{
    const res =  await request(app).post("/auth/login").send({
      email: "calOmotest@gmail.com",
      password: "12456",
    });
     expect(res.statusCode).toBe(400);
  })
});



