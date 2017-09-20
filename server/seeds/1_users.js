const bcrypt = require('bcrypt-as-promised');
const saltRounds = 10;
const userPassword = 'test'

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return Promise.all([
      // Inserts seed entries
      bcrypt.hash(userPassword, saltRounds).then(digest =>
        knex('users').insert({
          first: 'Daniel',
          last: 'Isham',
          email: 'danielisham1@gmail.com',
          password: digest,
          admin: true
      })),
      bcrypt.hash(userPassword, saltRounds).then(digest =>
        knex('users').insert({
          first: 'Michael',
          last: 'Smith',
          email: 'example1@gmail.com',
          password: digest,
          admin: false
      })),
      bcrypt.hash(userPassword, saltRounds).then(digest =>
        knex('users').insert({
          first: 'David',
          last: 'Johnson',
          email: 'example2@gmail.com',
          password: digest,
          admin: false
      }))
    ]);
  });
};
