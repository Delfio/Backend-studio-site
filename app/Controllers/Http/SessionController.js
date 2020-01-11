/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class SessionController {
  async store({ request, auth }) {
    const { email, senha } = request.all();

    // gerar token ao logar
    const {token} = await auth.attempt(email, senha);

     const user = await User.findByOrFail('email', email);

    return {
      user: user,
      token: token,
    };
  }
}

module.exports = SessionController;
