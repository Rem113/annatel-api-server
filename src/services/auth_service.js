import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import RegisterModel from "../core/models/register_model";
import LoginModel from "../core/models/login_model";
import Keys from "../config/keys";

// TODO: Document
export default ({ repository, validation }) =>
  Object.freeze({
    login: async user => {
      const errors = validation(user);

      if (errors) return LoginModel({ isLoggedIn: false, errors });

      const dbUser = await repository.findUserByEmail(user.email);

      if (!dbUser)
        return LoginModel({
          isLoggedIn: false,
          errors: {
            email: "There is no user associated to this email"
          }
        });

      const valid = await bcrypt.compare(user.password, dbUser.password);

      if (!valid)
        return LoginModel({
          isLoggedIn: false,
          errors: { password: "Password is incorrect" }
        });

      const payload = { id: dbUser._id, email: dbUser.email };
      const token = jwt.sign(payload, Keys.secretOrKey, { expiresIn: 3600 });

      return LoginModel({ isLoggedIn: true, payload: { token } });
    },

    register: async user => {
      const errors = validation(user);

      if (errors) return RegisterModel({ isRegistered: false, errors });

      const exists = await repository.findUserByEmail(user.email);

      if (exists)
        return RegisterModel({
          isRegistered: false,
          errors: {
            email: "A user with the same e-mail already exists"
          }
        });

      const newUser = Object.assign(user);

      const hash = await bcrypt.hash(user.password, 10);

      newUser.password = hash;

      try {
        const dbUser = await repository.createUser(newUser);
        return RegisterModel({ isRegistered: true, payload: dbUser });
      } catch (err) {
        return RegisterModel({
          isRegistered: false,
          errors: { message: "Couldn't create the user" }
        });
      }
    }
  });
