'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemNoticiaSchema extends Schema {
  up () {
    this.create('imagem_noticias', (table) => {
      table.increments()
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('noticia_id')
        .unsigned()
        .references('id')
        .inTable('noticias')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('imagem_noticias')
  }
}

module.exports = ImagemNoticiaSchema
