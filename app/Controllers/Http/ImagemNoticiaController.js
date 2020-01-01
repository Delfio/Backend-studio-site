/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Noticia = use('App/Models/Noticia');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemNoticia = use('App/Models/ImagemNoticia');

const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with imagemnoticias
 */
class ImagemNoticiaController {
  /**
   * Show a list of all imagemnoticias.
   * GET imagemnoticias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Create/save a new imagemnoticia.
   * POST imagemnoticias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    try {
      /* Verificação */
      const userAdmin = await User.find(auth.user.id);

      const noticiaExists = await Noticia.find(params.noticias_id);

      if (!userAdmin && !noticiaExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      /* Cadastro da imagem no banco e mover ela pra pasta */
      if (!request.file('imagem_noticia')) return;

      const upload = request.file('imagem_noticia', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/noticias'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemNoticia.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        noticia_id: params.noticias_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single imagemnoticia.
   * GET imagemnoticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const file = await ImagemNoticia.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/noticias/${file.file}`));
  }

  /**
   * Update imagemnoticia details.
   * PUT or PATCH imagemnoticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

}

module.exports = ImagemNoticiaController
