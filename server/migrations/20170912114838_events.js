
exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id');
    table.string('activity').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.integer('organizer').references('id').inTable('users').notNullable();
    table.text('image_url').notNullable().defaultTo('');
    table.date('date').notNullable();
    table.text('location').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
