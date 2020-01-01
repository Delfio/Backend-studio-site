'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemEmpresasDestaqueSchema extends Schema {
  up () {
    this.create('imagem_empresas_destaques', (table) => {
      table.increments()
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
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
    this.drop('imagem_empresas_destaques')
  }
}

module.exports = ImagemEmpresasDestaqueSchema
