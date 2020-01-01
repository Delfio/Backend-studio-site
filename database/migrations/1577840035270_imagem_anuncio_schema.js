'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemAnuncioSchema extends Schema {
  up () {
    this.create('imagem_anuncios', (table) => {
      table.increments()
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('anuncio_id')
        .unsigned()
        .references('id')
        .inTable('anuncios')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('imagem_anuncios')
  }
}

module.exports = ImagemAnuncioSchema
