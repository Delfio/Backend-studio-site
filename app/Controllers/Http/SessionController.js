class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    
    //gerar token ao logar
    const token = await auth.attempt(email, password);

    return { token };
  }
}

module.exports = SessionController;
