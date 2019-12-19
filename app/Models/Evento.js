/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evento extends Model {
  imagens() {
    // Um classificado tem varias fotos
    return this.hasMany('App/Models/ImagemEvento');
  }
}

module.exports = Evento;
