const { test, trait } = use('Test/Suite')('User');

trait('Test/ApiClient');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
trait('DatabaseTransactions');

test('Cadastrando Usuario', async ({ client, assert }) => {
  const email = 'delfio_eu@hotmail.com';
  const password = '123456';

  await Factory.model('App/Models/User').create({
    email,
    password,
  });

  const response = await client
    .post('/sessions')
    .send({
      email,
      password,
    })
    .end();

  response.assertStatus(200);

  assert.exists(response.body.token);
});

test('Atualização do usuario', async ({ assert, client }) => {
  const userCriar = {
    email: 'delfio_eu@hotmail.com',
    password: '123456',
  };

  const { username } = await Factory.model('App/Models/User').create(userCriar);

  const logar = await client
    .post('/sessions')
    .send(userCriar)
    .end();

  const { token } = logar.body.token;

  const response = await client
    .put('users/1')
    .send({ username: 'Delfio Francisco' })
    .header('Authorization', `Bearer ${token}`)
    .end();

  const valor = response.body.username !== username;

  assert.isTrue(valor);
});
