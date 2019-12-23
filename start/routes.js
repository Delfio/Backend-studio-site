/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar
Route.put('users/:id', 'UserController.update').middleware('auth'); // Update de users

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha

/* ##############    CLASSIFICADOS    ############## */

Route.get('imgCadastros/:id', 'ImageClassificadoController.show'); // Ver imagem sem estar logado;

Route.get('classificados', 'ClassificadoController.index'); // Listar classificados

Route.get('classificados/:id', 'ClassificadoController.show'); // Show classificados

Route.group(() => {
  // Route.post('imgCadastros', 'ImageClassificadoController.store'); // Enviar imagens
  Route.post('classificados', 'ClassificadoController.store'); // Cadastrar classificado
  Route.put('classificados/:id', 'ClassificadoController.update'); // Atualizar classificados
  Route.delete('classificados/:id', 'ClassificadoController.delete'); // Show classificados
}).middleware('auth');

/* Imagem dos classificados */
Route.group(() => {
  // A imagem só pode ser cadastrada se o classificado estiver também
  // todos os metodos
  Route.resource('classificados.imagem', 'ImageClassificadoController')
    .apiOnly()
    .except(['index', 'show', 'destroy']);
}).middleware(['auth']);

/* Videos dos classificados */
Route.group(() => {
  // O video só pode ser cadastrado se o classificado estiver também
  Route.resource('classificados.video', 'VideoClassificadoController')
    .apiOnly()
    .except(['index', 'show', 'destroy']); // todos os metodos
}).middleware(['auth']);

Route.delete(
  'classificados/:classificados_id/video/:id',
  'VideoClassificadoController.delete'
).middleware('auth');

Route.delete(
  'classificados/:classificados_id/imagem/:id',
  'ImageClassificadoController.delete'
).middleware('auth');

/* ##############    CLASSIFICADOS    ############## */

/* ##############    Eventos    ############## */

Route.get('eventos', 'EventoController.index');
Route.get('eventos/:id', 'EventoController.show');
Route.get('imgEvento/:id', 'ImagemEventoController.show'); // Ver imagem sem estar logado;

Route.group(() => {
  Route.post('eventos', 'EventoController.store');
  Route.put('eventos/:id', 'EventoController.update');
  // A imagem só pode ser cadastrada se o evento estiver também
  Route.resource('eventos.imagem', 'ImagemEventoController')
    .apiOnly()
    .except(['index', 'show', 'destroy']); // todos os metodos
}).middleware('auth');

/* Videos dos eventos */
Route.group(() => {
  // O video só pode ser cadastrado se o evento estiver também
  Route.resource('eventos.video', 'VideoEventoController')
    .apiOnly()
    .except(['index', 'show', 'destroy']); // todos os metodos
}).middleware(['auth']);

Route.delete('eventos/:id', 'EventoController.delete').middleware('auth');

Route.delete(
  '/eventos/:eventos_id/imagem/:id',
  'ImagemEventoController.delete'
).middleware('auth');

/* ##############    Eventos    ############## */

/* ##############    EMPRESAS    ############## */

Route.get('empresas', 'EmpresaController.index');
Route.get('empresas/:id', 'EmpresaController.show');

Route.group(() => {
  Route.post('empresas', 'EmpresaController.store');
  Route.delete('empresas/:id', 'EmpresaController.delete');
}).middleware('auth');

Route.group(() => {
  Route.resource('empresas.servico', 'ServicoController')
    .apiOnly()
    .except(['destroy']);
  Route.resource('empresas.imagem', 'ImagemEmpressaController')
    .apiOnly()
    .except(['index', 'show', 'update', 'destroy']);
}).middleware('auth');

Route.get('imgEmpresas/:id', 'ImagemEmpressaController.show');

/* ##############    EMPRESAS    ############## */

/* ##############    ADMIM    ############## */

/* Get Users para adms */
Route.get('users', 'AdministradorController.index').middleware('auth');

Route.delete('users', 'UserController.delete').middleware('auth');

/* cadastro */
Route.group(() => {
  Route.post('admin', 'AdministradorController.store');
}).middleware(['auth']);

/* ##############    ADMIM    ############## */
