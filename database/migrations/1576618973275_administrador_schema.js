/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AdministradorSchema extends Schema {
  up() {
    this.create('administradors', table => {
      table.increments();
      table.string('nome', 80).notNullable();
      table.string('telefone', 11).notNullable();
      table
        .string('email', 100)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('administradors');
  }
}

module.exports = AdministradorSchema;
