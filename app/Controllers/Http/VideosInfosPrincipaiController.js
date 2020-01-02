/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const InfosPrincipai = use('App/Models/InfosPrincipai');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideosInfosPrincipai = use('App/Models/VideosInfosPrincipai');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videosinfosprincipais
 */
class VideosInfosPrincipaiController {
  /**
   * Show a list of all videosinfosprincipais.
   * GET videosinfosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new videosinfosprincipai.
   * POST videosinfosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const infosExists = await InfosPrincipai.find(params.principal_id);

      if (infosExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['link', 'titulo', 'descricao']);

      const video = VideosInfosPrincipai.create({
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        infos_principai_id: params.principal_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Update videosinfosprincipai details.
   * PUT or PATCH videosinfosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const infosExists = await InfosPrincipai.find(params.principal_id);

      if (infosExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const videoExists = await VideosInfosPrincipai.find(params.id);

      if (!videoExists) return;

      const data = request.only(['link', 'titulo', 'descricao', 'empresas_id']);

      const video = {
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
      };

      videoExists.merge(video);

      await videoExists.save();

      return videoExists;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Delete a videosinfosprincipai with id.
   * DELETE videosinfosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) {
  }
}

module.exports = VideosInfosPrincipaiController
