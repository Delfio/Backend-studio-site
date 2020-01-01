'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Noticia = use('App/Models/Noticia');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemNoticia = use('App/Models/ImagemNoticia');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with noticias
 */
class NoticiaController {
  /**
   * Show a list of all noticias.
   * GET noticias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const noticia1 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '1')
        .orderBy('id', 'desc')
        .first();

      const noticia2 = await Noticia
        .query()
        .select(['id' ,'titulo', 'brev_descricao'])
        .where('tipo', '=', '2')
        .with('imagem')
        .orderBy('id', 'desc')
        .limit(4)
        .fetch();

      const noticia3 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '3')
        .orderBy('id', 'desc')
        .limit(2)
        .fetch();

      const noticia4 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '4')
        .orderBy('id', 'desc')
        .limit(3)
        .fetch();

      const noticia5 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '5')
        .with('imagem')
        .orderBy('id', 'desc')
        .limit(3)
        .fetch();

      const noticia6 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '6')
        .with('imagem')
        .orderBy('id', 'desc')
        .limit(3)
        .fetch();

      const noticia7 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '7')
        .orderBy('id', 'desc')
        .limit(12)
        .fetch();

      const noticia8 = await Noticia
        .query()
        .select(['id' ,'titulo'])
        .where('tipo', '=', '8')
        .with('imagem')
        .orderBy('id', 'desc')
        .limit(12)
        .fetch();


      return response.status(200).json({
        "Noticia 1": noticia1,
        "Noticia 2": noticia2,
        "Noticia 3": noticia3,
        "Noticia 4": noticia4,
        "Noticia 5": noticia5,
        "Noticia 6": noticia6,
        "Noticia 7": noticia7,
        "Noticia 8": noticia8,
      })
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Create/save a new noticia.
   * POST noticias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only([
        'titulo',
        'brev_descricao',
        'descricao',
        'tipo',
      ]);


      const userADM = await User.find(auth.user.id);

      if (!userADM.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const noticia = Noticia.create({
        titulo: data.titulo,
        brev_descricao: data.brev_descricao,
        descricao: data.descricao,
        tipo: data.tipo,
        user_id: auth.user.id,
      });

      return noticia;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single noticia.
   * GET noticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const noticia = await Noticia.find(params.id);

      if (!noticia) return;

      await noticia.load('user');
      await noticia.load('imagens');

      return noticia;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update ({ params, request, response, auth }) {
    try {
      const userADM = await User.find(auth.user.id);

      const noticia = await Noticia.find(params.id);

      if (!userADM.ADM || !noticia) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only([
        'titulo',
        'brev_descricao',
        'descricao',
        'tipo',
      ]);

      noticia.merge(data);

      await noticia.save();

      return noticia;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Delete a noticia with id.
   * DELETE noticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, response, auth }) {

    try {
      const noticia = await Noticia.findByOrFail('id', params.id);

      const dono = await User.find(auth.user.id);

      if (
        (noticia.user_id !== auth.user.id && !dono.ADM) ||
        !noticia
      ) {
        return response.status(401).json({ error: 'não autorizado' });
      }

      while (true) {
        const imagem = await ImagemNoticia.findBy(
          'noticia_id',
          noticia.id
        );

        console.log(imagem);

        if (imagem) await imagem.delete();

        if (!imagem) break;
      }

      await noticia.delete();
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: err.message });
    }

  }
}

module.exports = NoticiaController
