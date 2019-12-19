/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evento extends Model {
  user() {
    // Um evento tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagens() {
    // Um evento tem varias fotos
    return this.hasMany('App/Models/ImagemEvento');
  }
}

module.exports = Evento;
