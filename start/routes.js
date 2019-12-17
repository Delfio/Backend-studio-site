/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('Admin', 'AdministradorController.store'); // Cadastrar adm

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha
