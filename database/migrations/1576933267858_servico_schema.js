/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicoSchema extends Schema {
  up () {
    this.create('servicos', (table) => {
      table.increments();
      table.string('nome', 200).notNullable();
      table.text('descricao').notNullable();
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
    this.drop('servicos')
  }
}

module.exports = ServicoSchema;
