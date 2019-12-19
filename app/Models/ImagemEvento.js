'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ImagemEvento extends Model {
  static get computed() {
    return ['url']; // Url - campo statico ficticio
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/imgEvento/${id}`;
  }
}

module.exports = ImagemEvento;
