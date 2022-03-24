import server from "../../server.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
chai.use(chaiHttp);
const request = chai.request;
describe("POST api/login", () => {
  it("shoud respond 400 if username is not  given", async () => {
    let response;
    response = await request(server).post("/api/login").send();

    expect(response).to.have.status(400);

    response = await request(server)
      .post("/api/login")
      .send({ password: faker.internet.password() });
    expect(response).to.have.status(400);
  });

  it("shoud respond 400 password is not given", async () => {
    let response;
    response = await request(server).post("/api/login").send();

    expect(response).to.have.status(400);

    response = await request(server)
      .post("/api/login")
      .send({ username: faker.internet.userName() });
    expect(response).to.have.status(400);
  });

  it("should respond 201 with token if both password and username are valid", async () => {
    const response = await request(server).post("/api/login").send({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("token");
  });
});

describe("GET api/loggedIn", () => {
  it("should respond 401 if use is not loggendIn", async () => {
    const response = await request(server).get("/api/loggedIn");
    expect(response).to.have.status(401);
  });
  it("should respond 200 message if user is logged", async () => {
    // Get token from login
    const {
      body: { token },
    } = await request(server).post("/api/login").send({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    const response = await request(server)
      .get("/api/loggedIn")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message");
  });
});
