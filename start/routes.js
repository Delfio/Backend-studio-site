/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar
Route.put('users/:id', 'UserController.update').middleware('auth'); // Update de users

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha

/* Classificados */

Route.get('imgCadastros/:id', 'ImageClassificadoController.show'); // Ver imagem sem estar logado;

Route.get('classificados', 'ClassificadoController.index'); // Listar classificados

Route.get('classificados/:id', 'ClassificadoController.show'); // Show classificados

Route.group(() => {
  // Route.post('imgCadastros', 'ImageClassificadoController.store'); // Enviar imagens
  Route.post('classificados', 'ClassificadoController.store'); // Cadastrar classificado
  Route.put('classificados/:id', 'ClassificadoController.update'); // Atualizar classificados
  Route.delete('classificados/:id', 'ClassificadoController.destroy'); // Show classificados
}).middleware('auth');

/* Imagem dos classificados */
Route.group(() => {
  // A imagem só pode ser cadastrada se o classificado estiver também
  Route.resource(
    'classificados.imagem',
    'ImageClassificadoController'
  ).apiOnly(); // todos os metodos
}).middleware(['auth']);

/* Admin */
Route.group(() => {
  Route.post('admin', 'AdministradorController.store');
}).middleware(['auth']);

/* Eventos */

Route.get('eventos', 'EventoController.index');
Route.get('eventos/:id', 'EventoController.show');

Route.group(() => {
  Route.post('eventos', 'EventoController.store');
}).middleware('auth');

Route.get('imgEvento/:id', 'ImagemEventoController.show'); // Ver imagem sem estar logado;

/* Imagem do evento */
Route.group(() => {
  // A imagem só pode ser cadastrada se o evento estiver também
  Route.resource('eventos.imagem', 'ImagemEventoController').apiOnly(); // todos os metodos
}).middleware(['auth']);

/* Get Users para adms */
Route.get('users', 'AdministradorController.index').middleware('auth');

Route.delete('users', 'UserController.destroy').middleware('auth');
