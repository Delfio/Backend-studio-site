/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Anuncio = use('App/Models/Anuncio');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImagemAnuncio = use('App/Models/ImagemAnuncio');

const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class ImagemAnuncioController {

  async show({params, response}){
    const file = await ImagemAnuncio.find(params.id);

    if (!file) return;

    return response.download(Helpers.tmpPath(`uploads/anuncios/${file.file}`));
  }

  async store({ request, auth, params, response }) {

    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.anuncio_id);

      if(!anuncioExists) return;

      if (anuncioExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const upload = request.file('imagem_anuncio', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/anuncios'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await ImagemAnuncio.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
        anuncio_id: params.anuncio_id,
      });

      return file;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async update({ request, auth, params, response }) {
    try {
      /* Verificação */
      const userLogado = await User.find(auth.user.id);

      const anuncioExists = await Anuncio.find(params.anuncio_id);

      if(!anuncioExists) return;

      if (anuncioExists.user_id !== userLogado.id && !userLogado.ADM) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      const imagem = await ImagemAnuncio.find(params.id);

      if (!imagem) return;

      const upload = request.file('imagem_anuncio', {
        size: '2mb',
        extnames: ['png', 'jpeg', 'jpg'],
      });

      if (!upload) {
        return response.status(404).json({ error: 'Error' });
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads/anuncios'), {
        name: fileName,
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const data = {
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      };

      imagem.merge(data);
      await imagem.save();

      return imagem;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }

  async delete({ params, auth, response }) {
    try {
      const userLogado = await User.find(auth.user.id);

      const imagem = await ImagemAnuncio.find(params.id);

      if (!userLogado.ADM || !imagem) {
        return response.status(401).json({ error: 'Não autorizado' });
      }

      await imagem.delete();

      return;
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}


module.exports = ImagemAnuncioController
