/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ImageClassificado = use('App/Models/ImageClassificado');

const Helpers = use('Helpers');

/**
 * Resourceful controller for interacting with files
 */
class ImageClassificadoController {
  async store({ request, response }) {
    try {
      if(!request.file('file')) return;

      const upload = request.file('file', { size: '2mb' });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      });

      if(!upload.moved()){
        throw upload.error()
      }

      const file = await ImageClassificado.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });

      return file;
    }catch(err){
      return response.error();
    }
  }
}

module.exports = ImageClassificadoController;
