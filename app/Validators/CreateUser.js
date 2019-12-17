class CreateUser {
  get rules() {
    return {
      username: 'required',
      telefone: 'required|min:9',
      email: 'required|email|unique:users',
      password: 'required',
    };
  }

  get messages() {
    return {
      'username.required': 'Favor Informe o seu nome!',
      'telefone.required': 'Favor Informe seu telefone!',
      'email.required': 'Favor Informe um email!',
      'password.required': 'Insira uma senha!',

      'telefone.min': 'Quantidade de números inválidos!',
      'email.email': 'Formato de email inválido!',
      'email.unique': 'Email já em uso!',
    };
  }
}

module.exports = CreateUser;
