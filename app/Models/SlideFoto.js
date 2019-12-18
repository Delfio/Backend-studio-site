/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class SlideFoto extends Model {
  fotos() {
    return this.hasMany('App/Models/File');
  }
}

module.exports = SlideFoto;
