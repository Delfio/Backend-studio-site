/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('username', 80).notNullable();
      table.string('phone', 11).notNullable();
      table.string('phone2', 11).defaultTo('null');
      table.integer('anuncios').defaultTo(0);
      table.string('endereco', 120).notNullable();
      table.boolean('ADM').defaultTo(false);
      table
        .string('email', 100)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
