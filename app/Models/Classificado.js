/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Classificado extends Model {
  user() {
    // Um classificado tem um criador
    return this.belongsTo('App/Models/User');
  }

  sliders() {
    // Um classificado tem um slide
    return this.manyThrough('App/Models/SlideFoto', 'fotos');
  }
}

module.exports = Classificado;
