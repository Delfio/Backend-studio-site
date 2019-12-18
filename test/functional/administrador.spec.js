const { test, trait } = use('Test/Suite')('Administrador');

trait('Test/ApiClient');
trait('DatabaseTransactions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

test('Criar uma conta de adm', async ({ assert }) => {
  const response = await Factory.model('App/Models/User').create({ ADM: true });

  const { ADM } = response;

  assert.isTrue(ADM);
});
