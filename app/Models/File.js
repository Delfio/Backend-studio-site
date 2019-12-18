/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class File extends Model {
  slide() {
    // Um imagem tem um slide
    return this.belongsTo('App/Models/SlideFoto');
  }
}

module.exports = File;
