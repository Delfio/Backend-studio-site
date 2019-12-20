/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Evento = use('App/Models/Evento');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEvento = use('App/Models/VideoEvento');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videoeventos
 */
class VideoEventoController {
  /**
   * Show a list of all videoeventos.
   * GET videoeventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store({ request, auth, response, params }) {
    try {
      /* Verificação */
      const userAdmin = await User.find(auth.user.id);

      const eventoExists = await Evento.find(params.eventos_id);

      if (!userAdmin && !eventoExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['link', 'titulo', 'descricao']);

      const video = VideoEvento.create({
        ...data,
        evento_id: params.evento_id,
      });

      return video;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  async destoy({ auth, request, params, response }) {
    try {
        /* Verificação */
        const userLogado = await User.find(auth.params.id);

        const evento = await Evento.find(params.evento_id);
  
        if(!userLogado.ADM ||evento.user_id !== auth.user.id){
          return response.status(401).json({error: 'Não autorizado'})
        }
  
        const video = await VideoEvento.find(params.video);
  
        video.delete();
        
        return;

  } catch (err) {
    return response.status(500).json({error: 'Error'});
  }
  }
}
module.exports = VideoEventoController;
