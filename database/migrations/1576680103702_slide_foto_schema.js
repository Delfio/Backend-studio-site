/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SlideFotoSchema extends Schema {
  up () {
    this.create('slide_fotos', (table) => {
      table.increments();
      table.string('nome', 120).defaultTo('NULL');
      table.timestamps();
    })
  }

  down () {
    this.drop('slide_fotos');
  }
}

module.exports = SlideFotoSchema;
