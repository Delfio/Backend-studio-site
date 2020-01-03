/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Evento = use('App/Models/Evento');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEvento = use('App/Models/VideoEvento');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEvento = use('App/Models/ImagemEvento');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with eventos
 */
class EventoController {
  /**
   * Show a list of all eventos.
   * GET eventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async show({ params, response }) {
    try {
      const evento = await Evento.findByOrFail('id', params.id);

      await evento.load('user');
      await evento.load('imagens');
      await evento.load('videos');

      if (!evento) return;

      return evento;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  async index() {
    const eventos = Evento.query()
      .with('user')
      .with('imagem')
      .fetch();

    return eventos;
  }

  async store({ request, auth, response }) {
    /* Verificar se o usuario logado é adm */
    try {
      const data = request.only([
        'titulo',
        'descricao',
        'phone_contato',
        'email_contato',
        'responsavel',
      ]);

      const userAdmin = await User.find(auth.user.id);

      if (!userAdmin) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const evento = await Evento.create({
        ...data,
        user_id: auth.user.id,
      });

      return evento;
    } catch (err) {
      return response.status(500).json({ error: 'error' });
    }
  }

  async update({ request, params, auth, response }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const eventoRequest = await Evento.find(params.id);

      if (!userLogado.ADM && eventoRequest.user_id !== userLogado.id) {
        return response.status(401).json({ Error: 'Não autorizado' });
      }

      const data = request.only([
        'titulo',
        'descricao',
        'phone_contato',
        'email_contato',
        'responsavel',
      ]);

      eventoRequest.merge(data);

      await eventoRequest.save();

      return eventoRequest;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async delete({ params, response, auth }) {
    try {
      const eventoExists = await Evento.findByOrFail('id', params.id);

      const dono = await User.find(auth.user.id);

      if (
        (eventoExists.user_id !== auth.user.id && !dono.ADM) ||
        !eventoExists
      ) {
        return response.status(401).json({ error: 'não autorizado' });
      }

      while (true) {
        const imagemEvento = await ImagemEvento.findBy(
          'evento_id',
          eventoExists.id
        );

        const videoEvento = await VideoEvento.findBy(
          'evento_id',
          eventoExists.id
        );

        if (imagemEvento) await imagemEvento.delete();

        if (videoEvento) await videoEvento.delete();

        if (!imagemEvento && !videoEvento) break;
      }
      await eventoExists.delete();
    } catch (err) {
      return response.status(err.status).json({ error: err.message });
    }
  }
}

module.exports = EventoController;
