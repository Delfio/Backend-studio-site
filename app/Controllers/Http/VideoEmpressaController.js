/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEmpressa = use('App/Models/VideoEmpressa');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videoempressas
 */
class VideoEmpressaController {
  /**
   * Show a list of all videoempressas.
   * GET videoempressas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store({ request, auth, response, params }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['link', 'titulo', 'descricao', 'empresas_id']);

      const video = VideoEmpressa.create({
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        empresa_id: data.empresas_id || params.empresas_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update({ request, auth, response, params }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const videoExists = await VideoEmpressa.find(params.id);

      if (!videoExists) return;

      const data = request.only(['link', 'titulo', 'descricao', 'empresas_id']);

      const video = {
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        empresa_id: data.empresas_id || params.empresas_id,
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
      const videoExists = await VideoEmpressa.find(params.id);

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

module.exports = VideoEmpressaController;
