import server from "../../server.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
chai.use(chaiHttp);
const request = chai.request;
describe("PATCH api/patch", () => {
  it("shoud respond 401 if token is invalid or null", async () => {
    let response;
    response = await request(server).patch("/api/jsonpatch").send();
    expect(response).to.have.status(401);
    response = await request(server)
      .patch("/api/jsonpatch")
      .send({ json: {}, patch: [] });
    expect(response).to.have.status(401);
    response = await request(server)
      .patch("/api/jsonpatch")
      .set("Authorization", `Bearer ${faker.internet.password()}`)
      .send();
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
    it("shoud respond 400 if json object is not provided", async () => {
      let response;
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({});
      expect(response).to.have.status(400);
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({ patch: [] });
      expect(response).to.have.status(400);
    });
    it("shoud respond 400 with if json patch is not provided", async () => {
      let response;
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({});
      expect(response).to.have.status(400);
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({ json: [] });
      expect(response).to.have.status(400);
    });

    it("shoud respond 200 with if valid json object, json patch object are provided", async () => {
      let response;
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({ json: {}, patch: [] });
      expect(response).to.have.status(200);
    });
    it("shoud  properly perfom patch given all fields", async () => {
      let response;
      response = await request(server)
        .patch("/api/jsonpatch")
        .set("Authorization", `Bearer ${token}`)
        .send({
          json: {
            baz: "qux",
            foo: "bar",
          },
          patch: [
            { op: "replace", path: "/baz", value: "boo" },
            { op: "add", path: "/hello", value: ["world"] },
            { op: "remove", path: "/foo" },
          ],
        });
      expect(response.body)
        .to.have.property("patchedJson")
        .which.has.keys(["baz", "hello"]);
    });
  });
});
