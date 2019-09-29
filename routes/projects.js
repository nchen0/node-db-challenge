const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const knex = require("knex");
const db = knex(require("../knexfile.js").development);
const validateBoolean = require("../helpers/helper-functions").validateBoolean;

router.use(express.json());

// GET
router.get("/projects", (req, res) => {
  db("projects")
    .then(projects => {
      validateBoolean(projects);
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).send("Failed to get projects");
    });
});

router.get("/tasks", (req, res) => {
  db("tasks")
    .then(tasks => {
      validateBoolean(tasks);
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).send("Failed to get tasks");
    });
});

router.get("/resources", (req, res) => {
  db("resources")
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      res.status(500).send("Failed to get resources");
    });
});

module.exports = router;
