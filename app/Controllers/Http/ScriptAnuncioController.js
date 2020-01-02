/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Anuncio = use('App/Models/Anuncio');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ScriptAnuncio = use('App/Models/ScriptAnuncio');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with scriptanuncios
 */
class ScriptAnuncioController {
  /**
   * Show a list of all scriptanuncios.
   * GET scriptanuncios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {

      const script = ScriptAnuncio.all();

      return script;
    } catch (err) {
      return response.status(500).json({ error: err.message });

    }
  }

  /**
   * Create/save a new scriptanuncio.
   * POST scriptanuncios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    try {

      const userADM = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.anuncio_id);

      if (!userADM.ADM || !anuncioExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only(['script']);

      const script = ScriptAnuncio.create({
        ...data,
        anuncio_id: anuncioExists.id,
      })

      return script;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }


  /**
   * Update scriptanuncio details.
   * PUT or PATCH scriptanuncios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {

      const userADM = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.anuncio_id);

      const scriptExists = await ScriptAnuncio.find(params.id);

      if (!userADM.ADM || !anuncioExists || !scriptExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.all();

      await scriptExists.merge(data);

      await scriptExists.save();

      return scriptExists;
    } catch (err) {
      return response.status(500).json({ error: err.message });

    }
  }

  /**
   * Delete a scriptanuncio with id.
   * DELETE scriptanuncios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response, auth }) {
    try {

      const userADM = await User.find(auth.user.id);

      const scriptExists = await ScriptAnuncio.find(params.id);

      if (!userADM.ADM || !scriptExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      await scriptExists.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

module.exports = ScriptAnuncioController
