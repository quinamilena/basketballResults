exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("id").primary();

    table.date("gameDate").notNullable();
    table.integer("quantPoints").notNullable();

    table.string("user_id").notNullable();

    table.foreign("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
