/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Evento = use('App/Models/Evento');

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
      // await evento.load('videos'); implementar depois do migration

      if (!evento) return;

      return evento;
    } catch (err) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  async index() {
    const eventos = Evento.query()
      .with('user')
      .with('imagens')
      .fetch();
    // .with('videos') implementar depois do migrations

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
}

module.exports = EventoController;
