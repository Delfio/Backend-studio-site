/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

class ImageClassificado extends Model {
  static get computed() {
    return ['url']; // Url - campo statico ficticio
  }

  getUrl({ id }) {
    return `${Env.get('APP_URL')}/imgCadastros/${id}`;
  }
}

module.exports = ImageClassificado;
