import server from "../server.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const request = chai.request;
describe("GET /", function () {
  this.timeout(3000);

  after(() => {
    server.close();
  });
  it("should respond 404 not found", async () => {
    const response = await request(server).get("/");
    expect(response).to.have.status(404);
  });
});
describe("GET /api", function () {
  it("should respond 200 status", async () => {
    const response = await request(server).get("/api");
    expect(response).to.have.status(200);
  });
  it("should respond with message", async () => {
    const response = await request(server).get("/api");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message");
  });
});
