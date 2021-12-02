import app from "../app";
import request from "supertest";


let token:any 
describe("Users and Property API", () => {
  // it("should return a status of 201 when user is successfully returned", async () => {
  //   const res =  await request(app).post("/auth/signup").send({
  //     email: "calOmotest@gmail.com",
  //     first_name: "Ade",
  //     last_name: "Omo",
  //     password: "123456",
  //     phoneNumber: "08168029970",
  //     address: "No 7b Agape close woji port harcourt",
  //     is_admin: false,
  //   });
  //   expect(res.statusCode).toBe(201);
  // }),

  // it("should return a status of 201 when user is successfully returned", async () => {
  //   const res =  await request(app).post("/auth/signup").send({
  //     email: "Omotest@gmail.com",
  //     first_name: "Ade",
  //     last_name: "Omo",
  //     password: "123456",
  //     phoneNumber: "08168029970",
  //     address: "No 7b Agape close woji port harcourt",
  //     is_admin: false,
  //   });
  //   expect(res.statusCode).toBe(201);
  // }),
 
  it("should return a status of 409 when a user exists", async () => {
    const res =  await request(app).post("/auth/signup").send({
      email: "calOmotest@gmail.com",
      first_name: "Ade",
      last_name: "Omo",
      password: "123456",
      phoneNumber: "08168029970",
      address: "No 7b Agape close woji port harcourt",
      is_admin: false,
    });
    expect(res.statusCode).toBe(409);
  }),
  it("should return a status of 400 when user field property is not added", async () => {
    const res =  await request(app).post("/auth/signup").send({
      first_name: "Ade",
      last_name: "Omo",
      password: "123456",
      phoneNumber: "08168029970",
      address: "No 7b Agape close woji port harcourt",
      is_admin: false,
    });
    expect(res.statusCode).toBe(400);
  }),
 it("should return a status of 400 on unsuccessful login",async()=>{
    const res =  await request(app).post("/auth/login").send({
      email: "calOmotest@gmail.com",
      password: "12456",
    });
     expect(res.statusCode).toBe(400);
  }),

  it("should return a status of 200 on successful login",async()=>{
    const res =  await request(app).post("/auth/login").send({
      email: "calOmotest@gmail.com",
      password: "123456",
    });
    token = res.body.data.token
    console.log("i am token",token)
     expect(res.statusCode).toBe(200);
  })

  it("returns status code 201 if all property details are inputted:PROPERTIES", async () => {
    const response = await request(app)
      .post("/property")
      .attach(
        "image_url",
        "/Users/e/Desktop/postgresqltaskWithSequelize/ninscan.jpeg"
      )
      .field("status", "available")
      .field("price", 10000)
      .field("address", "Ikorodu, mile 12")
      .field("city", "Igbole")
      .field("state", "Ekiti")
      .field("type", "2-bedroom")
      .set("Cookie", `jwt=${token}`)
      .set("Accept", "application/json")
      .expect(201);
      expect(response.body.data).toBeTruthy();
      expect(response.body.status).toBe("success"), 10000;
  });
    
  it("returns status code 200 if all properties have been returned:PROPERTIES", async () => {
    const response = await request(app)
      .get("/property/properties")
      .expect(200);
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.properties[0]).toHaveProperty('id')
      expect(response.body.status).toBe("success"), 10000;
  });

it("returns status code 200 if a single property has been returned:PROPERTIES", async () => {
    const response = await request(app)
      .get(`/property/${4}`)
      .expect(200);
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.property).toHaveProperty('id')
      expect(response.body.status).toBe("success"), 10000;

  });

  it("returns status code 200 if a single property has been updated and returned:PROPERTIES", async () => {
    const response = await request(app)
    .put(`/property/${4}`)
    .attach(
        "image_url",
        "/Users/e/Desktop/postgresqltaskWithSequelize/ninscan.jpeg"
      )
      .field("status", "available")
      .field("price", 10000)
      .field("address", "Ajah Lagos")
      .field("city", "Igbole")
      .field("state", "Ekiti")
      .field("type", "1-bedroom")
      .set("Cookie", `jwt=${token}`)
      .set("Accept", "application/json")
      .expect(200);
      expect(response.body.data).toBeTruthy();
      expect(response.body.data.property).toHaveProperty('id')
      expect(response.body.status).toBe("success"), 10000;

  });

  it("returns status code 200 if a single property has been deleted:PROPERTIES", async () => {
    const response = await request(app).delete(`/property/${4}`).set("Cookie", `jwt=${token}`)
      .set("Accept", "application/json")
    console.log("hahahahahah",response.body,"i am token",token)
      expect(response.body.data).toBeTruthy();
      expect(response.body.status).toBe('success')
      expect(response.body.data.message).toBe("Property Ad has been deleted successfully"), 10000;

  });


  it("returns status code 400 if a single property doesnt exist:PROPERTIES", async () => {
    const response = await request(app)
      .get(`/property/${900}`)
       .expect(400);
       expect(response.body.errorMessage).toBe("No such Property exists"), 10000;
  });

   it("should return a status of 400 when a field is removed during login",async()=>{
    const res =  await request(app).post("/auth/login").send({
      email: "calOmotest@gmail.com"
    });
     expect(res.statusCode).toBe(400);
  })

 
});



