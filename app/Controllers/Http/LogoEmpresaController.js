/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const LogoEmpresa = use('App/Models/LogoEmpresa');

const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with logoempresas
 */
class LogoEmpresaController {

  /**
   * Create/save a new logoempresa.
   * POST logoempresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.empresas_id);

      if(!empresaExists) return;

      if (empresaExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const upload = request.file('logo_empresa', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/logoEmpresas'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await LogoEmpresa.create({
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

  /**
   * Display a single logoempresa.
   * GET logoempresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const file = await LogoEmpresa.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/logoEmpresas/${file.file}`));
  }


  /**
   * Update logoempresa details.
   * PUT or PATCH logoempresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a logoempresa with id.
   * DELETE logoempresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) {
  }
}

module.exports = LogoEmpresaController
