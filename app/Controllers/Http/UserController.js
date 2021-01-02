"use strict";

class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    return await auth.attempt(email, password);
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "Unauthorized: Not your profile";
    }
    return auth.user;
  }

  async register({ request, auth }) {
    const { email, username, password } = request.all();
    const User = use("App/Models/User");

    const user = new User();

    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();
    return user;
  }
}

module.exports = UserController;
