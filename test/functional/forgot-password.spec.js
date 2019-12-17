const Mail = use('Mail');

const { test, trait } = use('Test/Suite')('Recuperação de senha');

const User = use('App/Models/User');
const Hash = use('Hash');
const Database = use('Database');

const { subHours, format } = require('date-fns');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Teste de envio de email com instruções', async ({ assert, client }) => {
  Mail.fake();

  const email = 'delfio_eu@hotmail.com';

  const user = await Factory.model('App/Models/User').create({ email });

  const response = await client
    .post('/forgot')
    .send({ email })
    .end();

  response.assertStatus(204);

  const recentEmail = Mail.pullRecent();
  assert.equal(recentEmail.message.to[0].address, email);

  const token = await user.tokens().first();

  assert.include(token.toJSON(), {
    user_id: user.id,
    type: 'forgotpassword',
  });

  Mail.restore();
});

test('Reset de senha pelo link enviado', async ({ assert, client }) => {
  const email = 'delfio_eu@hotmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(204);

  await user.reload();

  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});

test('O reset não pode ser feito depois de 2 horas feito o chamado', async ({
  client,
}) => {
  const email = 'delfio_eu@hotmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const dateWithSub = format(subHours(new Date(), 1), 'yyy-MM-dd HH:ii:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(204);
});
