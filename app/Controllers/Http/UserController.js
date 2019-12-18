/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.all();

    const user = await User.create(data);

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
      return response
      .status(err.status)
      .send({ error: { message: 'Não foi possivel completar sua operação' } });
    }
  }
}

module.exports = UserController;
