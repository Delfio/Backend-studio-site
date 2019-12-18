/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store'); // Criar User
Route.post('sessions', 'SessionController.store'); // Logar
Route.put('users/:id', 'UserController.update').middleware('auth'); // Criar User

Route.post('forgot', 'ForgotPasswordController.store'); // Email para recuperaçaõ de senha
Route.post('reset', 'ResetPasswordController.store'); // Mudar a senha

