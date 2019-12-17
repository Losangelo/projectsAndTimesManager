'use strict';

//importando o model user para uso
const User = use ('App/Models/User');

class UserController {
  async store({request}) {
    const data = request.only (['username', 'email', 'password']);

    const user = await User.create (data);

    return user;
  }

  /*
  * resolver essa pendencia
  */
  async index (request) {
    const user = await User.all ();
    return user;
  }
}

module.exports = UserController;
