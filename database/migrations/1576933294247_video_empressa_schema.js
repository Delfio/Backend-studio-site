'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoEmpressaSchema extends Schema {
  up () {
    this.create('video_empressas', (table) => {
      table.increments();
      table.string('link', 200).notNullable();
      table.string('titulo', 200);
      table.text('descricao', 200);
      table
        .integer('empresas_id')
        .unsigned()
        .references('id')
        .inTable('empresas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('video_empressas')
  }
}

module.exports = VideoEmpressaSchema
