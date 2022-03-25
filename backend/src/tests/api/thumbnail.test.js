import server from "../../server.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const request = chai.request;
import { faker } from "@faker-js/faker";

describe("GET api/thumbnail", function () {
  this.timeout(5000);
  it("shoud respond 401 if token is invalid or null", async () => {
    let response;
    response = await request(server).get("/api/thumbnail").send();
    expect(response).to.have.status(401);
    response = await request(server)
      .get("/api/thumbnail")
      .send()
      .set("Authorization", `Bearer ${faker.random.alpha(20)}`);

    expect(response).to.have.status(401);
  });

  describe("given a valid token", () => {
    let token;
    before(async () => {
      const {
        body: { token: _token },
      } = await request(server).post("/api/login").send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      });
      token = _token;
    });
    it("shoud respond 400 if url is not provided", async () => {
      let response;
      response = await request(server)
        .get("/api/thumbnail")
        .set("Authorization", `Bearer ${token}`);
      expect(response).to.have.status(400);
    });
    it("shoud respond 400 with if url is not valid", async () => {
      let response;
      response = await request(server)
        .get("/api/thumbnail")
        .set("Authorization", `Bearer ${token}`)
        .query({ url: [] });
      expect(response).to.have.status(400);
      response = await request(server)
        .get("/api/thumbnail")
        .set("Authorization", `Bearer ${token}`)
        .query({ url: "https://www.google.com" });
      expect(response).to.have.status(400);
    });

    it("shoud respond 200 with if valid url is provided", async () => {
      let response;
      response = await request(server)
        .get("/api/thumbnail")
        .set("Authorization", `Bearer ${token}`)
        .query({
          url: faker.internet.avatar(),
        });
      expect(response).to.have.status(200);
    });
  });
});
