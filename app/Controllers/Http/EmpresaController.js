/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with empresas
 */
class EmpresaController {

  async index({ response }) {
    try{
      const empresa = Empresa.query()
        .with('user')
        .with('imagens')
        .with('videos')
        .fetch();

      return empresa;
    } catch (err) {
      return response.status(500).json({error: 'Error'});
    }
  }

  async store({ request, auth, response }) {
    const data = request.only([
      'nome',
      'descricao',
      'fone_contato',
      'fone_contato2',
      'email_contato',
      'endereco',
      'user_id',
    ]);

    try{
      const userADM = await User.find(auth.user.id);

      if ( !userADM.ADM ) {
        return response.status(401).json({error: 'Não autorizado'});
      }
  
      const empresa = Empresa.create({
        nome: data.nome,
        descricao: data.descricao,
        fone_contato: data.fone_contato,
        fone_contato2: data.fone_contato2,
        email_contato: data.email_contato,
        endereco: data.endereco,
        user_id: data.user_id || auth.user.id,
      });
  
      return empresa;
    } catch (err) {
      return response.status(500).json({error: 'Error'});
    }
  }

  async delete({ params, auth, response }) {

    try{
      const userADM = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.id);

      if ( !userADM.ADM || !empresaExists ) {
        return response.status(401).json({error: 'Não autorizado'});
      }

      await empresaExists.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

}

module.exports = EmpresaController;
