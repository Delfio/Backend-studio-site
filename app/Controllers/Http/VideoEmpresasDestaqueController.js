/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const EmpresasEmDestaque = use('App/Models/EmpresasEmDestaque');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEmpresasDestaque = use('App/Models/VideoEmpresasDestaque');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videoempresasdestaques
 */
class VideoEmpresasDestaqueController {
  /**
   * Show a list of all videoempresasdestaques.
   * GET videoempresasdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new videoempresasdestaque.
   * POST videoempresasdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await EmpresasEmDestaque.find(params.empresaDestaque_id);

      if(!empresaExists) return;

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }


      const data = request.only(['link', 'titulo', 'descricao', 'empresaDestaque_id']);

      const video = VideoEmpresasDestaque.create({
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        empresas_em_destaque_id: data.empresas_id || params.empresaDestaque_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single videoempresasdestaque.
   * GET videoempresasdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update videoempresasdestaque details.
   * PUT or PATCH videoempresasdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await EmpresasEmDestaque.find(params.empresaDestaque_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const videoExists = await VideoEmpresasDestaque.find(params.id);

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

  async delete({ params, auth, response }) {
    try {
      const userLogado = await User.find(auth.user.id);
      const videoExists = await VideoEmpresasDestaque.find(params.id);

      if (!userLogado.ADM || !videoExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      await videoExists.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

}

module.exports = VideoEmpresasDestaqueController
