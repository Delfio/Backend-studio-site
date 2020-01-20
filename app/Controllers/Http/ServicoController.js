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

  async store({ request, auth, params, response }) {
    const data = request.only(['nome', 'descricao', 'empresa_id']);

    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const servico = Servico.create({
        nome: data.nome,
        descricao: data.descricao,
        empresa_id: data.empresa_id || params.empresas_id,
      });

      return servico;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update({ request, auth, params, response }) {
    try {
      /* Verificação */
      const servicoExists = await Servico.find(params.id);

      if (!servicoExists) return;

      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['nome', 'descricao', 'empresa_id']);

      servicoExists.merge(data);

      await servicoExists.save();

      return servicoExists;
    }catch(err){

    }
  }

  async delete({ params, auth, response }){
    try {
      const userLogado = await User.find(auth.user.id);

      const servico = await Servico.find(params.id);

      if(!userLogado.ADM && !servico) {
        return response.status(404).json({ error: 'Not Found' });
      }

      await servico.delete();

      return;
    }catch(err){
      return response.status(500).json({error: err.message});
    }
  }

  async allServicos({params}){
    console.log('teste')

  }
}

module.exports = ServicoController;
