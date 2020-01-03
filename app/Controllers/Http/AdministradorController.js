/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/**Classificado */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Classificado = use('App/Models/Classificado');

/** Anuncios */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Anuncio = use('App/Models/Anuncio');

/** principal */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const InfosPrincipai = use('App/Models/InfosPrincipai');

/** noticias */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Noticia = use('App/Models/Noticia');

/** noticias */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Empresa = use('App/Models/Empresa');

/**
 * Resourceful controller for interacting with administradors
 */
class AdministradorController {
  async index({ auth, response }) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const users = User.all();

      return users;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async store({ request, auth, response }) {
    const data = request.only(['username', 'phone', 'email', 'password']);

    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const user = User.create({
        ...data,
        ADM: true,
      });

      return user;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

    // const token = await auth.attempt(email, password)
  }

  async class({ auth, response }) {

    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const classificado = await Classificado
        .query()
        .select('*')
        .with('imagens')
        .with('videos')
        .fetch();

      return classificado;
    }catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async autorizarClass({ auth, response, params }) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const classificadoExists = await Classificado.find(params.id);

      if(!classificadoExists || classificadoExists.aprovado) return;

      const aprovado = {
        aprovado: 1,
      }
      await classificadoExists.merge(aprovado),

      await classificadoExists.save();

      return classificadoExists;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async anuncios({ auth, response }) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const anuncios1 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '1')
        .fetch();

      const anuncios2 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '2')
        .fetch();

      const anuncios3 = await Anuncio
        .query()
        .select('*')
        .with('imagem')
        .with('script')
        .where('tipo', '=', '3')
        .fetch();

      return response.status(200).json({
        "Anuncio1": anuncios1,
        "Anuncio2": anuncios2,
        "Anuncio3": anuncios3,
      });

    } catch (err) {
      return response.status(500).json({ error: err.message });

    }
  }

  async principal({ auth, response }) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const infos = await InfosPrincipai
        .query()
        .select('*')
        .with('imagens')
        .with('videos')
        .fetch()

      console.log(infos);
      return infos;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }

  }

  async noticias({auth, response}) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const noticias = Noticia
        .query()
        .select('*')
        .with('imagens')
        .fetch()

      return noticias;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async empresas({auth, response}) {
    try {
      const userNotAdm = await User.find(auth.user.id);

      if (!userNotAdm.ADM) {
        return response.status(401).json({ error: 'Você não esta autorizado' });
      }

      const empresas = Empresa
        .query()
        .select('*')
        .with('imagens')
        .with('videos')
        .fetch()

      return empresas;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}
module.exports = AdministradorController;
