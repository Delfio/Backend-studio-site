/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const InfosPrincipai = use('App/Models/InfosPrincipai');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with infosprincipais
 */
class InfosPrincipaiController {
  /**
   * Show a list of all infosprincipais.
   * GET infosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, view }) {
    try {

      const Info1 = await InfosPrincipai
        .query()
        .select('*')
        .where('tipo', '=', '1')
        .with('video')
        .orderBy('id', 'desc')
        .first();

      const Info2 = await InfosPrincipai
        .query()
        .select('*')
        .where('tipo', '=', '2')
        .with('imagem')
        .orderBy('id', 'desc')
        .limit(4)
        .fetch();

      const Info3 = await InfosPrincipai
        .query()
        .select('*')
        .where('tipo', '=', '3')
        .with('video')
        .orderBy('id', 'desc')
        .first();

      return response.status(200).json({
        "Info1": Info1,
        "Info2": Info2,
        "Info3": Info3,
      })
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Create/save a new infosprincipai.
   * POST infosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {

      const userADM = await User.find(auth.user.id);

      if (!userADM.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['tipo', 'titulo', 'empresa', 'descricao', 'telefone'])

      const principal = InfosPrincipai.create({
        ...data,
        user_id: auth.user.id
      });

      return principal;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single infosprincipai.
   * GET infosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, view }) {

    try {
      const Parametro = params.id;

      if(Parametro == 1) return;

      const infos = await InfosPrincipai.find(params.id);

      if(!infos) {
        return response.status(401).json({Error: 'Not Found'})
      }

      await infos.load('videos');
      await infos.load('imagens');

      return infos;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

  }

  /**
   * Update infosprincipai details.
   * PUT or PATCH infosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const userADM = await User.find(auth.user.id);

      const info = await InfosPrincipai.find(params.id);

      if (!userADM.ADM || !info) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['tipo', 'titulo', 'empresa', 'descricao', 'telefone']);

      info.merge(data);

      await info.save();

      return info;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Delete a infosprincipai with id.
   * DELETE infosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) {
  }
}

module.exports = InfosPrincipaiController
