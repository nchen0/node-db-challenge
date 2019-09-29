const express = require("express");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;

// Routes
const projectRoutes = require("./routes/projects");
server.use("/", projectRoutes);

// const taskRoutes;
// const resourceRoutes;

server.use("*", (req, res) => {
  res.status(404).send("You've stumbled upon an invalid page.");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
