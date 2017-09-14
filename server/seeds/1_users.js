const userList = require('../sample_data/users');
// const bcrypt = require('bcrypt-as-promised');
//
// console.log('test', test(userList));
//
// function test(array) {
//   console.log('hit1');
//   array.forEach((user) => {
//     console.log('user: ', user['password']);
//     user.password = hashed(user.password);
//     console.log('user2', user);
//   });
//   return array;
// }
//
// function hashed(password) {
//   console.log('hit2');
//   return bcrypt.hash(password, 10)
//   .then((result) => {
//     console.log(result);
//     return result;
//   })
//   .catch((result) => {
//     console.log('error');
//     return result;
//   })
// }


exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => knex('users').insert(userList));
    // .then(() => knex('users').insert(test(userList)));
};
