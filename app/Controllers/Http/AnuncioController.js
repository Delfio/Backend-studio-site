/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Anuncio = use('App/Models/Anuncio');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemAnuncio = use('App/Models/ImagemAnuncio');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ScriptAnuncio = use('App/Models/ScriptAnuncio');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with anuncios
 */
class AnuncioController {
  /**
   * Show a list of all anuncios.
   * GET anuncios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const Anuncio1 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '1')
        .orderBy('id', 'desc')
        .first();

      const Anuncio2 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '2')
        .orderBy('id', 'asc')
        .first();

      const Anuncio3 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '3')
        .orderBy('id', 'asc')
        .first();


      return response.status(200).json({
        "Anuncio1": Anuncio1,
        "Anuncio2": Anuncio2,
        "Anuncio3": Anuncio3,
      });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Create/save a new anuncio.
   * POST anuncios
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

      const data = request.only(['titulo', 'empresa', 'tipo'])

      const anuncio = await Anuncio.create({
        ...data,
        user_id: auth.user.id
      })

      return anuncio;

    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response, auth }) {
    try {

      const userADM = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.id);

      if (!userADM.ADM || !anuncioExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['titulo', 'empresa', 'tipo']);

      anuncioExists.merge(data);

      await anuncioExists.save();

      return anuncioExists;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

  }

  async delete ({ params, auth, response }) {
    try {

      const userADM = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.id);

      if (!userADM.ADM || !anuncioExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }


      while (true) {
        const imagemAnuncio = await ImagemAnuncio.findBy(
          'anuncio_id',
          anuncioExists.id
        );

        const scriptAnuncio = await ScriptAnuncio.findBy(
          'anuncio_id',
          anuncioExists.id
        );

        if (imagemAnuncio) await imagemAnuncio.delete();

        if (scriptAnuncio) await scriptAnuncio.delete();

        if (!imagemAnuncio && !scriptAnuncio) break;
      }

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

module.exports = AnuncioController
