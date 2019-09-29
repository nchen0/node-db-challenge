const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const knex = require("knex");
const db = knex(require("../knexfile.js").development);
const validateBoolean = require("../helpers/helper-functions").validateBoolean;
const validatePost = require("../helpers/helper-functions").validatePost;

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

// POST
router.post("/projects", (req, res) => {
  const validatedResult = validatePost(req, res);
  if (validatedResult.error) {
    return res.status(400).send(validatedResult.error.details[0].message);
  }

  db("projects")
    .insert(req.body)
    .then(response => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      res.status(500).send("Error adding to projects");
    });
});

router.post("/tasks", (req, res) => {
  const newTask = req.body;
  const schema = Joi.object({
    description: Joi.string()
      .min(3)
      .required(),
    notes: Joi.string(),
    project_id: Joi.integer().required()
  });
  const validatedResult = schema.validate(newPost);
  if (validatedResult.error) {
    return res.status(400).send(validatedResult.error.details[0].message);
  }

  db("tasks")
    .insert(req.body)
    .then(response => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      res.status(500).send("Error adding to tasks");
    });
});

// GET 1
router.get("/projects/:id", (req, res) => {
  db("projects")
    .where({ id: Number(req.params.id) })
    .then(project => {
      if (project.length < 1) {
        return res.status(404).send(`Cannot find project with id: ${req.params.id}`);
      }
      db("tasks")
        .where({ project_id: Number(req.params.id) })
        .then(task => {
          if (task.length > 0) {
            project[0]["tasks"] = task;
          }
          return res.status(200).json(project);
        });
    });
});

module.exports = router;
