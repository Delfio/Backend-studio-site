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
        params.classificado_id
      );

      if (classificadoExists.user_id !== userLogado.id || !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only([
        'link',
        'titulo',
        'descricao',
        'classificado_id',
      ]);

      const video = VideoClassificado.create({
        titulo: data.titulo,
        link: data.link,
        descricao: data.descricao,
        classificado_id: data.classificado_id || params.evento_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}

module.exports = VideoClassificadoController;