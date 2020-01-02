'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosInfosPrincipaiSchema extends Schema {
  up () {
    this.create('videos_infos_principais', (table) => {
      table.increments()
      table.string('link', 200).notNullable();
      table.string('titulo', 200);
      table.text('descricao', 200);
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
    this.drop('videos_infos_principais')
  }
}

module.exports = VideosInfosPrincipaiSchema
