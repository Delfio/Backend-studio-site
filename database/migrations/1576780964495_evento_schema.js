/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventoSchema extends Schema {
  up() {
    this.create('eventos', table => {
      table.increments();
      table.string('titulo', 200).notNullable();
      table.text('descricao').notNullable();
      table.string('phone_contato', 11).defaultTo('Null');
      table.string('email_contato').defaultTo('Null');
      table.string('responsavel', 120).defaultTo('Null');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('eventos');
  }
}

module.exports = EventoSchema;
