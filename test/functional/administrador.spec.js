const { test, trait } = use('Test/Suite')('Administrador');

trait('Test/ApiClient');
trait('DatabaseTransactions');
test('Cadastro de administradores', async ({ client }) => {
  const response = await client
    .post('/Admin')
    .send({
      nome: 'Delfio Francisco',
      telefone: '993014603',
      email: 'delfioadm_eu@hotmail.com',
      password: '123456',
    })
    .end();
  /*
const response = await 
  client.post('/users')
  .send({
    email: 'delfio_eu@hotmail.com',
    password: '123456'
  }).end()
*/
  response.assertStatus(200);
  // assert.exists(createUser.body.token);
});
