/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Evento = use('App/Models/Evento');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEvento = use('App/Models/ImagemEvento');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers');

/**
 * Resourceful controller for interacting with imagemeventos
 */
class ImagemEventoController {
  /**
   * Show a list of all imagemeventos.
   * GET imagemeventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ request, response, params, auth }) {
    try {
      /* Verificação */
      const userAdmin = await User.find(auth.user.id);

      const eventoExists = await Evento.find(params.eventos_id);

      if (!userAdmin && !eventoExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      /* Cadastro da imagem no banco e mover ela pra pasta */
      if (!request.file('imagem_evento')) return;

      const upload = request.file('imagem_evento', { size: '2mb' });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/eventos'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemEvento.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        evento_id: params.eventos_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: 'error' });
    }
  }

  async show({ params, response }) {
    const file = await ImagemEvento.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/eventos/${file.file}`));
  }
}

module.exports = ImagemEventoController;
