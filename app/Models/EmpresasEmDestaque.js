'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EmpresasEmDestaque extends Model {
  user() {
    // Uma empresa tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagens() {
    // Uma empresa tem varias fotos
    return this.hasMany('App/Models/ImagemEmpresasDestaque');
  }

  imagem() {
    return this.hasOne('App/Models/ImagemEmpresasDestaque')
  }

  videos() {
    // Uma empresa tem vários vídeos
    return this.hasMany('App/Models/VideoEmpresasDestaque');
  }

}

module.exports = EmpresasEmDestaque
