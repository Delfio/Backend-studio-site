/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar
Route.put('users/:id', 'UserController.update').middleware('auth'); // Update de users

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha

/* Classificados */

Route.get('files/:id', 'ImageClassificadoController.show'); // Ver imagem sem estar logado;

Route.group(() => {
  Route.post('file', 'ImageClassificadoController.store'); // Enviar imagens
  Route.post('classificados', 'ClassificadoController.store'); // Cadastrar classificado
  Route.get('classificados', 'ClassificadoController.index'); // Listar classificados
  Route.put('classificados/:id', 'ClassificadoController.update'); // Atualizar classificados
  Route.get('classificados/:id', 'ClassificadoController.show'); // Show classificados
  Route.delete('classificados/:id', 'ClassificadoController.destroy'); // Show classificados
}).middleware('auth');
