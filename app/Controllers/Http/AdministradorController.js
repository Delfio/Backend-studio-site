/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Administrador = use('App/Models/Administrador');


/**
 * Resourceful controller for interacting with administradors
 */
class AdministradorController {
  async store({ request }) {

    const data = request.all();

    const user = await Administrador.create(data);

    // const token = await auth.attempt(email, password)

    return user;
  }
}

module.exports = AdministradorController;
