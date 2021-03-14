exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("login", 15).notNullable();
    table.integer("record");
    table.integer("timeRecord");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
