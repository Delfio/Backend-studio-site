/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Mail = use('Mail');
const Env = use('Env');

const User = use('App/Models/User');

const crypto = require('crypto');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');

      const user = await User.findByOrFail('email', email);

      const token = crypto.randomBytes(16).toString('hex');

      await user.tokens().create({
        token,
        type: 'forgotpassword',
      });

      const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

      await Mail.send(
        ['emails.forgotpassword'],
        { name: user.name, resetPasswordUrl },
        message => {
          message
            .to(user.email)
            .from('teste@gmail.com')
            .subject('Recuperação de Senha');
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Email não existe' } });
    }
  }
}

module.exports = ForgotPasswordController;
