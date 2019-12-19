'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventoSchema extends Schema {
  up () {
    this.create('eventos', (table) => {
      table.increments();
      table.string('titulo', 200).notNullable();
      table.text('descricao').notNullable();
      table.string('phone_contato', 11).defaultTo('Null');
      table.string('email_contato', 11).defaultTo('Null');
      table.string('responsavel', 120).defaultTo('Null');
      table.timestamps();
    })
  }

  down () {
    this.drop('eventos');
  }
}

module.exports = EventoSchema;
