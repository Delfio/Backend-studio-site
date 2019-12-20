/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'phone', 'email', 'password']);

    const user = await User.create({
      ...data,
      ADM: false,
    });

    // const token = await auth.attempt(email, password)

    return user;
  }

  async update({ request, params, response }) {
    const data = request.all();
    try {
      const user = await User.findByOrFail('id', params.id);

      user.merge(data);

      await user.save();

      return user;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Não foi possivel completar sua operação' },
      });
    }
  }

  async destroy({ auth, response, request }) {
    const idSolicitado = request.only(['id']);

    try {
      const userLogado = await User.find(auth.user.id);

      const userRequest = await User.find(idSolicitado);

      if (auth.user.id !== idSolicitado && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      await userRequest.delete();

      response.status(200).json({ ok: true });
    } catch (err) {
      return response.status(500).json({ error: 'error' });
    }
  }
}

module.exports = UserController;
