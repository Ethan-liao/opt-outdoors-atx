
exports.up = function (knex) {
  return knex.schema.createTable('events_comments', (table) => {
    table.increments('comment_id')
    table.text("content")
    table.integer("event_id").index().references("id").inTable("events").onDelete("cascade").notNull()
    table.integer("user_id").index().references("id").inTable("users").onDelete("cascade").notNull()
    table.dateTime("comment_created_at").notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('events_comments')
}
