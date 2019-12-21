/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideoEventoSchema extends Schema {
  up() {
    this.create('video_eventos', table => {
      table.increments();
      table.string('link', 200).notNullable();
      table.string('titulo', 200);
      table.text('descricao', 200);
      table
        .integer('evento_id')
        .unsigned()
        .references('id')
        .inTable('eventos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('video_eventos');
  }
}

module.exports = VideoEventoSchema;
