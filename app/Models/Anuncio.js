'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Anuncio extends Model {
  user() {
    // Um anuncio tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagem() {
    // Um anuncio tem uma imagem
    return this.hasOne('App/Models/ImagemAnuncio');
  }

  script() {
    // Um anuncio tem um script
    return this.hasOne('App/Models/ScriptAnuncio');
  }
}

module.exports = Anuncio
