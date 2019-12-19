/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImageClassificado = use('App/Models/ImageClassificado');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Classificado = use('App/Models/Classificado');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Helpers = use('Helpers');

/**
 * Resourceful controller for interacting with files
 */
class ImageClassificadoController {
  async store({ request, response, params, auth }) {
    try {
      /* Verificando se existe esse classificado */
      const classificadoExists = await Classificado.find(
        params.classificados_id
      );

      const userLogado = await User.find(auth.user.id);

      if (
        (!classificadoExists && classificadoExists.user_id !== auth.user.id) ||
        (!userLogado.ADM && !classificadoExists)
      ) {
        return response.status(404).json({ error: 'error' });
      }

      /* Cadastro da imagem no banco e mover ela pra pasta */
      if (!request.file('imagens_cadastro')) return;

      const upload = request.file('imagens_cadastro', { size: '2mb' });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/classificados'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImageClassificado.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        classificado_id: params.classificados_id,
      });

      return file;
    } catch (err) {
      return response
        .status(404)
        .json({ error: 'Não foi possivel completar sua operação' });
    }
  }

  async show({ params, response }) {
    const file = await ImageClassificado.find(params.id);

    if (!file) return;

    return response.download(
      Helpers.tmpPath(`uploads/classificados/${file.file}`)
    );
  }
}

module.exports = ImageClassificadoController;
