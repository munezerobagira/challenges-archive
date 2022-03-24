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
