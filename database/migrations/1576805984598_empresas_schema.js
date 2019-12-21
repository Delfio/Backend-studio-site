/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EmpresasSchema extends Schema {
  up() {
    this.create('empresas', table => {
      table.increments();
      table.string('nome', 200).notNullable();
      table.text('descricao').notNullable();
      table.string('fone_contato', 11).notNullable();
      table.string('fone_contato2', 11);
      table.string('email_contato');
      table.string('endereco').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('empresas');
  }
}

module.exports = EmpresasSchema;
