const { test, trait } = use('Test/Suite')('File')

const Helpers = use('Helpers');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Enviar imagem', async ({ client }) => {
  /*
  const response = await client
  .post('/file')
  .field('title', 'Adonis 101')
  .attach('cover_image', Helpers.tmpPath('cover-image.jpg'))
  .end()

  response.assertStatus(204);
*/
});
