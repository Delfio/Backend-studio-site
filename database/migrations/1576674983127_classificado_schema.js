/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClassificadoSchema extends Schema {
  up() {
    this.create('classificados', table => {
      table.increments();
      table.string('titulo', 200).notNullable();
      table.text('descricao').notNullable();
      table.string('fone_contato', 11).notNullable();
      table.float('preco', [8], [2]).notNullable();
      table.boolean('aprovado').defaultTo(false);
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
    this.drop('classificados');
  }
}

module.exports = ClassificadoSchema;
