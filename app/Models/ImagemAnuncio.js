'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

class ImagemAnuncio extends Model {
  anuncio () {
    return this.belongsTo('App/Models/Anuncio')
  }

  static get computed() {
    return ['url']; // Url - campo statico ficticio
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/anuncioImage/${id}`;
  }
}

module.exports = ImagemAnuncio
