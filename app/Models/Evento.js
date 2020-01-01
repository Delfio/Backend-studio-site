/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Evento extends Model {
  user() {
    // Um evento tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagem() {
    return this.hasOne('App/Models/ImagemEvento')
  }

  imagens() {
    // Um evento tem varias fotos
    return this.hasMany('App/Models/ImagemEvento');
  }

  videos() {
    // Um evento tem vários vídeos
    return this.hasMany('App/Models/VideoEvento');
  }
}

module.exports = Evento;
