'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InfosPrincipaisSchema extends Schema {
  up () {
    this.create('infos_principais', (table) => {
      table.increments();
      table.enum('tipo', ['1', '2', '3']);
      table.string('titulo', 200).notNullable();
      table.string('empresa', 200);
      table.text('descricao');
      table.string('telefone', 11);
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('infos_principais')
  }
}

module.exports = InfosPrincipaisSchema
