'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageClassificadoSchema extends Schema {
  up () {
    this.create('image_classificados', (table) => {
      table.increments();
      table.string('file').notNullable();
      table.string('name').notNullable();
      table.string('type', 20).notNullable();
      table.string('subtype', 20).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.timestamps();

    })
  }

  down () {
    this.drop('image_classificados')
  }
}

module.exports = ImageClassificadoSchema;
