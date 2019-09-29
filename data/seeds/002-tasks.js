exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        { description: "Scrub the spaceship", completed: false, project_id: 1 },
        { description: "Clean the stalls", completed: false, project_id: 1 }
      ]);
    });
};
