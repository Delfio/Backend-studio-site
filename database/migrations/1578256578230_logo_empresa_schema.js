'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogoEmpresaSchema extends Schema {
  up () {
    this.create('logo_empresas', (table) => {
      table.increments()
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('empresa_id')
        .unsigned()
        .references('id')
        .inTable('empresas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('logo_empresas')
  }
}

module.exports = LogoEmpresaSchema
