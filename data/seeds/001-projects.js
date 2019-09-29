exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Echo-1", description: "Spaceships", completed: false },
        { name: "Tesla-3", description: "Cars", completed: false }
      ]);
    });
};
