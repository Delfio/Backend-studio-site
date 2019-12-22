/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Classificado = use('App/Models/Classificado');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoClassificado = use('App/Models/VideoClassificado');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videoclassificados
 */
class VideoClassificadoController {
  /**
   * Show a list of all videoclassificados.
   * GET videoclassificados
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

      const classificadoExists = await Classificado.find(
        params.classificados_id
      );

      if (classificadoExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only([
        'link',
        'titulo',
        'descricao',
        'classificados_id',
      ]);

      const video = VideoClassificado.create({
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        classificado_id: data.classificados_id || params.classificados_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  async delete({ auth, params, response }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.params.id);

      const classificado = await Classificado.find(params.classificado_id);

      if (!userLogado.ADM || classificado.user_id !== auth.user.id) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const video = await VideoClassificado.find(params.video);

      video.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  async update({ params, request, response, auth }) {
    const data = request.only([
      'link',
      'titulo',
      'descricao',
      'classificados_id',
    ]);

    try {
      const userLogado = await User.find(auth.user.id);

      const classificadoExists = await Classificado.find(
        params.classificados_id
      );

      const videoExits = await VideoClassificado.find(params.id);

      if (classificadoExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      videoExits.merge(data);

      await videoExits.save();

      return videoExits;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}

module.exports = VideoClassificadoController;
