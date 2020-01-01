'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoticiaSchema extends Schema {
  up () {
    this.create('noticias', (table) => {
      table.increments();
      table.string('titulo', 200).notNullable();
      table.string('brev_descricao', 200).notNullable();
      table.text('descricao').notNullable();
      table.enum('tipo', ['1', '2', '3', '4', '5', '6', '7', '8']).defaultTo('8');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('noticias')
  }
}

module.exports = NoticiaSchema
