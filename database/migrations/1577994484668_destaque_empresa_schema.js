'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestaqueEmpresaSchema extends Schema {
  up () {
    this.table('empresas', (table) => {
      // alter table
      table.boolean('destaque').defaultTo(false);
    })
  }

  down () {
    this.table('empresas', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DestaqueEmpresaSchema
