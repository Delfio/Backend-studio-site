'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScriptAnuncioSchema extends Schema {
  up () {
    this.create('script_anuncios', (table) => {
      table.increments()
      table.text('script').notNullable();
      table
        .integer('anuncio_id')
        .unsigned()
        .references('id')
        .inTable('anuncios')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('script_anuncios')
  }
}

module.exports = ScriptAnuncioSchema
