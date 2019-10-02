const request = require("supertest");
const knex = require("knex");

const server = require("./index.js");
const db = require("./data/dbConfig.js");

beforeEach(async () => {
  // this function executes and clears out the table before each test
  await db.raw("SET foreign_key_checks = 0");
  await db("projects").truncate();
  await db.raw("SET foreign_key_checks = 1");
});

describe("index.js", () => {
  describe("index route", () => {
    it("should return an OK status code from the index route", () => {
      const expectedStatusCode = 200;
      return request(server)
        .get("/projects")
        .then(response => {
          expect(response.status).toEqual(expectedStatusCode);
        });
    });

    it("should return a JSON object from the index route", () => {
      const expectedBody = [];
      return request(server)
        .get("/projects")
        .then(response => {
          expect(response.body).toEqual(expectedBody);
        });
    });

    it("should return a JSON object from the index route", () => {
      return request(server)
        .get("/projects")
        .then(response => {
          expect(response.type).toEqual("application/json");
        });
    });
  });
});

describe("projects", () => {
  describe("insert", () => {
    it("should insert a project into the database", async () => {
      await db("projects").insert({ name: "Samwise", description: "Gamge" });
      const response = await db("projects");
      expect(response).toHaveLength(1);
    });

    it("should have the newly added project in the database", async () => {
      await db("projects").insert({ name: "Samwise", description: "Gamge" });
      const response = await db("projects");
      expect(response[0].name).toEqual("Samwise");
    });
  });
});
