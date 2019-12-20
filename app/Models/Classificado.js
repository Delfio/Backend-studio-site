/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Classificado extends Model {
  user() {
    // Um classificado tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagens() {
    // Um classificado tem varias fotos
    return this.hasMany('App/Models/ImageClassificado');
  }

  videos() {
    // Um classificado tem vários vídeos
    return this.hasMany('App/Models/VideoClassificado');
  }
}

module.exports = Classificado;
