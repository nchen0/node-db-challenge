exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "Bolt", description: "Tool" },
        { name: "Screws", description: "Utillity" }
      ]);
    });
};
