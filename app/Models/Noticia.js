'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Noticia extends Model {
  user() {
    // Um evento tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagem() {
    return this.hasOne('App/Models/ImagemNoticia')
  }

  imagens() {
    // Um evento tem varias fotos
    return this.hasMany('App/Models/ImagemNoticia');
  }

}

module.exports = Noticia
