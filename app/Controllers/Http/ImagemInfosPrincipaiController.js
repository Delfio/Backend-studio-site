/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const InfosPrincipai = use('App/Models/InfosPrincipai');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemInfosPrincipai = use('App/Models/ImagemInfosPrincipai');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers');
/**
 * Resourceful controller for interacting with imageminfosprincipais
 */
class ImagemInfosPrincipaiController {
  /**
   * Show a list of all imageminfosprincipais.
   * GET imageminfosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new imageminfosprincipai.
   * POST imageminfosprincipais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params, auth }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const infoExists = await InfosPrincipai.find(params.principal_id);

      if(!infoExists) return;

      if (infoExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const upload = request.file('imagem_principal', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/principal'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemInfosPrincipai.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        infos_principai_id: params.principal_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single imageminfosprincipai.
   * GET imageminfosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const file = await ImagemInfosPrincipai.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/principal/${file.file}`));
  }

  /**
   * Update imageminfosprincipai details.
   * PUT or PATCH imageminfosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const principalExists = await InfosPrincipai.find(params.principal_id);

      if (principalExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const imagem = await ImagemInfosPrincipai.find(params.id);

      if (!imagem) return;

      const upload = request.file('imagem_principal', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/principal'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const data = {
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      };

      imagem.merge(data);
      await imagem.save();

      return imagem;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Delete a imageminfosprincipai with id.
   * DELETE imageminfosprincipais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, auth, response }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const imagem = await ImagemInfosPrincipai.find(params.id);

      if (!userLogado.ADM || !imagem) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      await imagem.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

module.exports = ImagemInfosPrincipaiController
