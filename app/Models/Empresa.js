/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Empresa extends Model {
  user() {
    // Uma empresa tem um criador
    return this.belongsTo('App/Models/User');
  }

  imagens() {
    // Uma empresa tem varias fotos
    return this.hasMany('App/Models/ImagemEmpressa');
  }

  imagem() {
    return this.hasOne('App/Models/ImagemEmpressa')
  }

  logo() {
    return this.hasOne('App/Models/LogoEmpresa')
  }

  videos() {
    // Uma empresa tem vários vídeos
    return this.hasMany('App/Models/VideoEmpressa');
  }
  servicos() {
    // Uma empresa tem vários vídeos
    return this.hasMany('App/Models/Servico');
  }
}

module.exports = Empresa;
