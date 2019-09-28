exports.up = function(knex) {
  return knex.schema
    .createTable("projects", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("description", 128);
      table.boolean("completed");
    })
    .createTable("tasks", table => {
      table.increments();
      table.string("description").notNullable();
      table.string("notes");
      table.boolean("completed");
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("resources", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("description");
    })
    .createTable("projects_resources", table => {
      table.increments();
      table
        .integer("project_id", 10)
        .references("id")
        .inTable("projects");
      table
        .integer("resource_id", 10)
        .references("id")
        .inTable("resources");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
