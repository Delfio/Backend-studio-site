/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar
Route.put('users/:id', 'UserController.update').middleware('auth'); // Update de users

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha

Route.delete('users', 'UserController.delete').middleware('auth');

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
  Route.put('empresas/:id', 'EmpresaController.update');
}).middleware('auth');

Route.group(() => {
  Route.resource('empresas.servico', 'ServicoController')
    .apiOnly()
    .except(['destroy', 'show']);
  Route.delete('empresas/servico/:id', 'ServicoController.delete');

  Route.resource('empresas.imagem', 'ImagemEmpressaController')
    .apiOnly()
    .except(['index', 'show', 'destroy']);
  Route.delete('empresas/imagem/:id', 'ImagemEmpressaController.delete');

  Route.resource('empresas.video', 'VideoEmpressaController')
    .apiOnly()
    .except(['index', 'show', 'destoy', 'delete']);
  Route.delete('empresas/video/:id', 'VideoEmpressaController.delete');

  /*
  Route.put(
    'empresas/:empresas_id/imagem/:id',
    'ImagemEmpressaController.update'
  );
  */
}).middleware('auth');

Route.get('imgEmpresas/:id', 'ImagemEmpressaController.show');

/* ##############    EMPRESAS    ############## */



/* ##############    NOTICIAS    ############## */

Route.get('noticias', 'NoticiaController.index');
Route.get('noticias/:id', 'NoticiaController.show');
Route.get('imgNoticias/:id', 'ImagemNoticiaController.show')

Route.group(() => {
  Route.resource('noticias', 'NoticiaController')
    .apiOnly()
    .except(['index', 'show', 'destroy', 'delete']);

  Route.delete('noticias/:id', 'NoticiaController.delete');

  Route.resource('noticias.imagem', 'ImagemNoticiaController')
    .apiOnly()
    .except(['show', 'delete']);
}).middleware('auth')

/* ##############    NOTICIAS    ############## */

/* ##############    EMPRESAS DESTAQUES    ############## */

Route.get('empresaDestaque', 'EmpresasEmDestaqueController.index');

Route.get('empresaDestaque/:id', 'EmpresasEmDestaqueController.show');

Route.get('imgEmpresasDestaques/:id', 'ImagemEmpresasDestaqueController.show');

Route.get('/empresaDestaque/:empresaDestaque_id/video', 'VideoEmpresasDestaqueController.show');

Route.group(() => {
  Route.resource('empresaDestaque', 'EmpresasEmDestaqueController')
    .apiOnly()
    .except(['index', 'show', 'destroy']);

  Route.resource('empresaDestaque.imagem', 'ImagemEmpresasDestaqueController')
    .apiOnly()
    .except(['index', 'show', 'destroy']);

  Route.resource('empresaDestaque.video', 'VideoEmpresasDestaqueController')
    .apiOnly()
    .except(['index', 'show', 'destroy']);

  Route.delete('empresaDestaque/video/:id', 'VideoEmpresasDestaqueController.delete');

  Route.delete('empresaDestaque/imagem/:id', 'ImagemEmpresasDestaqueController.delete');

  Route.delete('empresaDestaque/:id', 'EmpresasEmDestaqueController.delete');
}).middleware('auth');

/* ##############    EMPRESAS DESTAQUES    ############## */

/* ##############    ANUNCIOS    ############## */

Route.get('anuncio', 'AnuncioController.index');

Route.get('anuncioImage/:id', 'ImagemAnuncioController.show');

Route.group(() =>{
  Route.resource('anuncio', 'AnuncioController').apiOnly().except(['index', 'show', 'destroy']);

  Route.delete('anuncio/:id', 'AnuncioController.delete');

  Route.resource('anuncio.script', 'ScriptAnuncioController').apiOnly()
    .except(['index', 'show', 'destroy']);

  Route.resource('anuncio.imagem', 'ImagemAnuncioController').apiOnly()
    .except(['show', 'index', 'destroy']);

  Route.delete('anuncio/imagem/:id', 'ImagemAnuncioController.delete')

  Route.get('anuncio/script', 'ScriptAnuncioController.index');

  Route.delete('anuncio/script/:id', 'ScriptAnuncioController.delete');
}).middleware('auth')

/* ##############    ANUNCIOS    ############## */

/* ##############    ADMIM    ############## */

/* Get Users para adms */
Route.get('users', 'AdministradorController.index').middleware('auth');

/* cadastro */
Route.group(() => {
  Route.post('admin', 'AdministradorController.store');
}).middleware(['auth']);

/* ##############    ADMIM    ############## */
