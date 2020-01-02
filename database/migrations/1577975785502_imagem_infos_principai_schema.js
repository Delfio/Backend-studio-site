'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemInfosPrincipaiSchema extends Schema {
  up () {
    this.create('imagem_infos_principais', (table) => {
      table.increments()
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('infos_principai_id')
        .unsigned()
        .references('id')
        .inTable('infos_principais')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('imagem_infos_principais')
  }
}

module.exports = ImagemInfosPrincipaiSchema
