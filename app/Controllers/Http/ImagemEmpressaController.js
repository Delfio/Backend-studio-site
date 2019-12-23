/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEmpressa = use('App/Models/ImagemEmpressa');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with imagemempressas
 */
class ImagemEmpressaController {
  /**
   * Show a list of all imagemempressas.
   * GET imagemempressas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async show({ params, response }) {
    const file = await ImagemEmpressa.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/empresas/${file.file}`));
  }

  async store({ request, auth, params, response }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if(!empresaExists) return;

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const upload = request.file('imagem_empresa', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/empresas'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemEmpressa.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        empresa_id: params.empresas_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update({ request, auth, params, response }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const imagem = await ImagemEmpressa.find(params.id);

      if (!imagem) return;

      const upload = request.file('imagem_empresa', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/empresas'), {
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
        empresa_id: params.empresas_id,
      };

      imagem.merge(data);
      await imagem.save();

      return imagem;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async delete({ params, auth, response }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const imagem = await ImagemEmpressa.find(params.id);

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

module.exports = ImagemEmpressaController;
