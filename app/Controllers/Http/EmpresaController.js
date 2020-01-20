/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemEmpressa = use('App/Models/ImagemEmpressa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const VideoEmpressa = use('App/Models/VideoEmpressa');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Servico = use('App/Models/Servico');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with empresas
 */
class EmpresaController {
  async index({ response }) {
    try {
      const empresaDestaque = await Empresa.query()
        .select('*')
        .where('destaque', '=', true)
        .with('imagem')
        .with('logo')
        .orderBy('id', 'desc')
        .first();

      const empresasNormais = await Empresa.query()
        .select('*')
        .where('destaque', '=', false)
        .with('logo')
        .orderBy('id', 'desc')
        .fetch();

      return response.status(200).json({
        "EmpresaDestaque": empresaDestaque,
        "EmpresasNormais": empresasNormais,
      });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async show({ params, response }){
    try {
      const empresa = await Empresa.find(params.id);

      if (!empresa) return;

      const Empresas = await Empresa.query()
        .select('*')
        .where('id', '=', empresa.id)
        .with('logo')
        .with('user')
        .with('imagens')
        .with('videos')
        .with('servicos')
        .orderBy('id', 'desc')
        .fetch();

      return response.status(200).json({
        Empresas
      });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async store({ request, auth, response }) {
    const data = request.only([
      'nome',
      'descricao',
      'fone_contato',
      'fone_contato2',
      'email_contato',
      'endereco',
      'destaque',
      'user_id',
    ]);

    try {
      const userADM = await User.find(auth.user.id);

      if (!userADM.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const empresa = Empresa.create({
        nome: data.nome,
        descricao: data.descricao,
        fone_contato: data.fone_contato,
        fone_contato2: data.fone_contato2,
        email_contato: data.email_contato,
        endereco: data.endereco,
        destaque: data.destaque,
        user_id: data.user_id || auth.user.id,
      });

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update({ request, auth, response, params }){
    try {
      const userADM = await User.find(auth.user.id);

      const empresa = await Empresa.find(params.id);

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
        'destaque',
      ]);

      empresa.merge(data);

      await empresa.save();

      return empresa;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async delete({ params, auth, response }) {
    try {
      const userADM = await User.find(auth.user.id);

      const empresaExists = await Empresa.find(params.id);

      if (!userADM.ADM || !empresaExists) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      while(true){
        const imagem = await ImagemEmpressa.findBy('empresa_id', empresaExists.id);

        const video = await VideoEmpressa.findBy('empresa_id', empresaExists.id);

        const servico = await Servico.findBy('empresa_id', empresaExists.id);

        if (imagem) await imagem.delete();
        if (video) await video.delete();
        if (servico) await servico.delete();

        if (!imagem && !video && !servico) break;
      }

      await empresaExists.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

module.exports = EmpresaController;
