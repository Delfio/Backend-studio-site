/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Classificado = use('App/Models/Classificado');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/**
 * Resourceful controller for interacting with classificados
 */
class ClassificadoController {
  async index() {
    const classificados = Classificado.query()
      .with('user')
      .with('imagens')
      .fetch();

    return classificados;
  }

  async store({ request, auth }) {
    const data = request.only(['titulo', 'descricao', 'fone_contato', 'preco']);

    const classificado = await Classificado.create({
      ...data,
      user_id: auth.user.id,
    });

    return classificado;
  }

  async show({ params }) {
    const classificado = await Classificado.find(params.id);

    await classificado.load('user');
    await classificado.load('imagens');

    if (!classificado) return;

    return classificado;
  }

  async update({ request, params, response, auth }) {
    const data = request.only(['titulo', 'descricao', 'fone_contato', 'preco']);

    try {
      const classificado = await Classificado.find(params);

      const dono = await User.find(auth.user.id);

      if (classificado.user_id !== auth.user.id && !dono.ADM) {
        return response.status(401).json({ error: 'não autorizado' });
      }

      classificado.merge(data);

      await classificado.save();

      return classificado;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Não foi possivel completar sua operação' },
      });
    }
  }

  async destroy({ params, response, auth }) {
    try {
      const classificado = await Classificado.find(params.id);

      const dono = await User.find(auth.user.id);

      if (classificado.user_id !== auth.user.id && !dono.ADM) {
        return response.status(401).json({ error: 'não autorizado' });
      }
      await classificado.delete();
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: 'não foi possivel completar sua operação' });
    }
  }
}

module.exports = ClassificadoController;
