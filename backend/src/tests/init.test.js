import server from "../server.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
const request = chai.request;
describe("GET /", function () {
  after(() => {
    server.close();
  });
  this.timeout(3000);
  it("should respond 404 not found", async () => {
    const response = await request(server).get("/");
    expect(response).to.have.status(404);
  });
});
// describe("/api", () => {
//   it("should respond 200", async () => {
//     const response = await request(server).get("/api");
//     expect(response).to.have.status(200);
//   });

// });
