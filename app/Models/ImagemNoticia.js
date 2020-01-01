'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ImagemNoticia extends Model {
  static get computed() {
    return ['url']; // Url - campo statico ficticio
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/imgNoticias/${id}`;
  }
}

module.exports = ImagemNoticia
