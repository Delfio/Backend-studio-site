'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InfosPrincipai extends Model {
  imagem() {
    return this.hasOne('App/Models/ImagemInfosPrincipai')
  }

  video() {
    return this.hasOne('App/Models/VideosInfosPrincipai')
  }

  imagens() {
    // Um evento tem varias fotos
    return this.hasMany('App/Models/ImagemInfosPrincipai');
  }

  videos() {
    // Um evento tem varias fotos
    return this.hasMany('App/Models/VideosInfosPrincipai');
  }

}

module.exports = InfosPrincipai
