const request = require("supertest");

const server = require("./index.js");

describe("index.js", () => {
  describe("index route", () => {
    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get("/projects");

      expect(response.status).toEqual(expectedStatusCode);
    });
  });
});
