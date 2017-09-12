
exports.up = function (knex) {
  return knex.schema.createTable('events_users', (table) => {
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('event_id').references('id').inTable('events').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events_users');
};
