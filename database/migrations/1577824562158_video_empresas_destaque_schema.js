'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoEmpresasDestaqueSchema extends Schema {
  up () {
    this.create('video_empresas_destaques', (table) => {
      table.increments()
      table.string('link', 200).notNullable();
      table.string('titulo', 200);
      table.text('descricao', 200);
      table
        .integer('empresas_em_destaque_id')
        .unsigned()
        .references('id')
        .inTable('empresas_em_destaques')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('video_empresas_destaques')
  }
}

module.exports = VideoEmpresasDestaqueSchema
