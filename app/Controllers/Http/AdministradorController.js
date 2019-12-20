/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

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
      return response.status(500).json({ error: 'error' });
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
      return response.status(500).json({ error: 'error' });
    }

    // const token = await auth.attempt(email, password)
  }
}

module.exports = AdministradorController;
