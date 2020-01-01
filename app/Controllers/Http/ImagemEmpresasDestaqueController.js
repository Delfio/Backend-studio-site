/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEmpresasDestaque = use('App/Models/ImagemEmpresasDestaque');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const EmpresasEmDestaque = use('App/Models/EmpresasEmDestaque');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers');

/**
 * Resourceful controller for interacting with imagemempresasdestaques
 */
class ImagemEmpresasDestaqueController {
  /**
   * Show a list of all imagemempresasdestaques.
   * GET imagemempresasdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new imagemempresasdestaque.
   * POST imagemempresasdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, params, response }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await EmpresasEmDestaque.find(params.empresaDestaque_id);

      if(!empresaExists) return;

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const upload = request.file('imagem_empresa_destaque', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/empresasDestaque'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemEmpresasDestaque.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        empresas_em_destaque_id: params.empresaDestaque_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single imagemempresasdestaque.
   * GET imagemempresasdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const file = await ImagemEmpresasDestaque.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/empresasDestaque/${file.file}`));
  }

  /**
   * Update imagemempresasdestaque details.
   * PUT or PATCH imagemempresasdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await EmpresasEmDestaque.find(params.empresaDestaque_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const imagem = await ImagemEmpresasDestaque.find(params.id);

      if (!imagem) return;

      const upload = request.file('imagem_empresa_destaque', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/empresasDestaque'), {
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
   * Delete a imagemempresasdestaque with id.
   * DELETE imagemempresasdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, response, auth }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const imagem = await ImagemEmpresasDestaque.find(params.id);

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

module.exports = ImagemEmpresasDestaqueController
