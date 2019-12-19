/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImagemEventoSchema extends Schema {
  up() {
    this.create('imagem_eventos', table => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('evento_id')
        .unsigned()
        .references('id')
        .inTable('eventos');
      table.timestamps();
    });
  }

  down() {
    this.drop('imagem_eventos');
  }
}

module.exports = ImagemEventoSchema;
