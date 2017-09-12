
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first').notNullable().defaultTo('');
    table.string('last').notNullable().defaultTo('');
    table.string('email').notNullable().defaultTo('');
    table.string('password').notNullable().defaultTo('');
    table.boolean('admin').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
