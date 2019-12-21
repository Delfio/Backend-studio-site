/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Servico = use('App/Models/Servico');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicos
 */
class ServicoController {
  /**
   * Show a list of all servicos.
   * GET servicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async store ({ request, auth, params, response }) {
    const data = request.only(['nome', 'descricao', 'empresas_id']);

    try{

      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const servico = Servico.create({
        nome: data.nome,
        descricao: data.descricao,
        empresas_id: data.empresas_id || params.empresas_id,
      })

      return servico;
    }catch(err){
      return response.status(500).json({ error: 'Error' });
    }
  }
}

module.exports = ServicoController;
