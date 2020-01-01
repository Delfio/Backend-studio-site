/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEmpresasDestaque = use('App/Models/ImagemEmpresasDestaque');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const EmpresasEmDestaque = use('App/Models/EmpresasEmDestaque');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEmpresasDestaque = use('App/Models/VideoEmpresasDestaque');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with empresasemdestaques
 */
class EmpresasEmDestaqueController {
  /**
   * Show a list of all empresasemdestaques.
   * GET empresasemdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const empresa = EmpresasEmDestaque.query()
        .with('user')
        .with('imagem')
        .with('videos')
        .fetch();

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Create/save a new empresasemdestaque.
   * POST empresasemdestaques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'nome',
      'descricao',
      'fone_contato',
      'fone_contato2',
      'email_contato',
      'endereco',
      'user_id',
    ]);

    try {
      const userADM = await User.find(auth.user.id);

      if (!userADM.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const empresa = EmpresasEmDestaque.create({
        nome: data.nome,
        descricao: data.descricao,
        fone_contato: data.fone_contato,
        fone_contato2: data.fone_contato2,
        email_contato: data.email_contato,
        endereco: data.endereco,
        user_id: data.user_id || auth.user.id,
      });

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Display a single empresasemdestaque.
   * GET empresasemdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const empresa = await EmpresasEmDestaque.find(params.id);

      if (!empresa) return;

      await empresa.load('user');
      await empresa.load('imagens');
      await empresa.load('videos');

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  /**
   * Update empresasemdestaque details.
   * PUT or PATCH empresasemdestaques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const userADM = await User.find(auth.user.id);

      const empresa = await EmpresasEmDestaque.find(params.id);

      if (!userADM.ADM || !empresa) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const data = request.only([
        'nome',
        'descricao',
        'fone_contato',
        'fone_contato2',
        'email_contato',
        'endereco',
      ]);

      empresa.merge(data);

      await empresa.save();

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async delete ({params, response, auth}) {
    try {
      const userADM = await User.find(auth.user.id);

      const empresaExists = await EmpresasEmDestaque.find(params.id);

      if (!userADM.ADM || !empresaExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      while(true){
        const imagem = await ImagemEmpresasDestaque.findBy('empresas_em_destaque_id', empresaExists.id);

        const video = await VideoEmpresasDestaque.findBy('empresas_em_destaque_id', empresaExists.id);

        if (imagem) await imagem.delete();
        if (video) await video.delete();

        if (!imagem && !video) break;
      }

      await empresaExists.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

}

module.exports = EmpresasEmDestaqueController
