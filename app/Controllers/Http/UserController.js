const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.all();

    const user = await User.create(data);

    // const token = await auth.attempt(email, password)

    return user;
  }
}

module.exports = UserController;
