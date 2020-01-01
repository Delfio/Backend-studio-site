'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnunciosSchema extends Schema {
  up () {
    this.create('anuncios', (table) => {
      table.increments()
      table.string('titulo', 200).notNullable();
      table.string('empresa', 200);
      table.enum('tipo', ['1', '2', '3']);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('anuncios')
  }
}

module.exports = AnunciosSchema
