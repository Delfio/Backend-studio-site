class Lojas {
  get rules() {
    return {
      nome: 'required|min:5|max:20',
      descricao: 'required|min:10',
      endereco: 'required|min:5',
      CNPJ: 'required|min:14|max:14',
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

module.exports = Lojas;
