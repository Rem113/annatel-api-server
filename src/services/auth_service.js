import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Keys from "../config/keys";
import { Either } from "monet";
import { InvalidInputFailure } from "../core/failures";

/**
 * Auth functionnalities
 * @param {UserRepository} repository
 * @param {UserValidator} validation
 * @returns {AuthService}
 */
export default ({ repository, validation }) =>
  Object.freeze({
    /**
     * @param {Object} user
     * @returns {Either<Failure, AuthToken>}
     */
    login: async user => {
      // Validate input
      const errors = validation(user);

      if (errors)
        return Either.left(new InvalidInputFailure("Invalid input", errors));

      // Check if the user exists
      const dbUser = await repository.findUserByEmail(user.email);

      if (!dbUser)
        return Either.left(
          new InvalidInputFailure("There is no user associated to this email")
        );

      // Compare the passwords
      const valid = await bcrypt.compare(user.password, dbUser.password);

      if (!valid) return;
      Either.left(new InvalidInputFailure("Password is incorrect"));

      // Builds the token
      const payload = { id: dbUser._id, email: dbUser.email };
      const token = jwt.sign(payload, Keys.secretOrKey, { expiresIn: 3600 });

      return Either.right(token);
    },

    /**
     * @param {Object} user
     * @returns {Either<Failure, User>}
     */
    register: async user => {
      // Validate input
      const errors = validation(user);

      if (errors)
        return Either.left(new InvalidInputFailure("Invalid input", errors));

      // Check if the email is taken
      const exists = await repository.findUserByEmail(user.email);

      if (exists)
        return Either.left(
          new InvalidInputFailure("A user with the same e-mail already exists")
        );

      // Build the new user
      const newUser = Object.assign(user);

      // Hash the password before storing it
      const hash = await bcrypt.hash(user.password, 10);
      newUser.password = hash;

      try {
        const dbUser = await repository.createUser(newUser);
        return Either.right(dbUser);
      } catch (err) {
        return Either.left(new InternalFailure("Couldn't create the user"));
      }
    }
  });
