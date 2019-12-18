class Classificado {
  get rules() {
    return {
      titulo: 'required|min:5|max:200',
      descricao: 'required|min:10',
      endereco: 'required|min:5',
      fone_contato: 'required|min:9|max:11',
      preco: 'required',
      user_id: 'required|exists:users,id',
    };
  }

  get messages() {
    return {
      'nome.required': 'Favor Informe o nome da loja!',
      'descricao.required': 'Favor Informe a descrição da loja!',
      'endereco.required': 'Favor informe um endereço válido!',
      'CNPJ.required': 'Insira o CNPJ da empresa!',

      'nome.min': 'Nome muito curto!',
      'nome.max': 'Nome muito grande!',
      'descricao.min': 'A descrição não contem os caracteres suficientes!',
      'endereco.min': 'Favor informe um endereço válido!',
      'CNPJ.min': 'CNPJ INVÁLIDO!',
      'CNPJ.max': 'CNPJ INVÁLIDO!',
    };
  }
}

module.exports = Classificado;
