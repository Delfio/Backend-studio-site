'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoClassificadoSchema extends Schema {
  up () {
    this.create('video_classificados', (table) => {
      table.increments();
      table.string('link', 200).notNullable();
      table.string('titulo', 200);
      table.text('descricao', 200);
      table
        .integer('classificado_id')
        .unsigned()
        .references('id')
        .inTable('classificados')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('video_classificados');
  }
}

module.exports = VideoClassificadoSchema;
