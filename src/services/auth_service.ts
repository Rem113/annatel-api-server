import { Either } from "monet";
import {
  Failure,
  InternalFailure,
  InvalidInputFailure,
} from "../core/failures";
import { IUser } from "../models/user.model";
import { IValidator } from "../core/validators";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Keys from "../config/keys";
import UserRepository from "../repositories/user_repository";

class AuthService {
  userRepository: UserRepository;
  emailValidator: IValidator;
  passwordValidator: IValidator;

  constructor(
    userRepository: UserRepository,
    emailValidator: IValidator,
    passwordValidator: IValidator
  ) {
    this.userRepository = userRepository;
    this.emailValidator = emailValidator;
    this.passwordValidator = passwordValidator;
  }

  async login(user: IUser): Promise<Either<Failure, string>> {
    // Validate input
    const emailError = this.emailValidator.validate(user.email);
    if (emailError) return Either.left(new InvalidInputFailure(emailError));

    const passwordError = this.passwordValidator.validate(user.password);
    if (passwordError)
      return Either.left(new InvalidInputFailure(passwordError));

    // Check if the user exists
    const dbUser = await this.userRepository.findUserByEmail(user.email);

    if (dbUser === null)
      return Either.left(
        new InvalidInputFailure("There is no user associated to this email")
      );

    // Compare the passwords
    const valid = await bcrypt.compare(user.password, dbUser.password);

    if (!valid)
      return Either.left(new InvalidInputFailure("Password is incorrect"));

    // Builds the token
    const payload = { id: dbUser._id, email: dbUser.email };
    const token = jwt.sign(payload, Keys.secretOrKey, { expiresIn: 3600 });

    return Either.right(token);
  }

  async register(user: IUser): Promise<Either<Failure, IUser>> {
    // Validate input
    const emailError = this.emailValidator.validate(user.email);
    if (emailError) return Either.left(new InvalidInputFailure(emailError));

    const passwordError = this.passwordValidator.validate(user.password);
    if (passwordError)
      return Either.left(new InvalidInputFailure(passwordError));

    // Check if the email is taken
    const exists = await this.userRepository.findUserByEmail(user.email);

    if (exists !== null)
      return Either.left(
        new InvalidInputFailure("A user with the same e-mail already exists")
      );

    // Build the new user
    const newUser = Object.assign(user);

    // Hash the password before storing it
    const hash = await bcrypt.hash(user.password, 10);
    newUser.password = hash;

    try {
      const dbUser = await this.userRepository.createUser(newUser);
      return Either.right(dbUser);
    } catch (err) {
      return Either.left(new InternalFailure("Couldn't create the user"));
    }
  }
}

export default AuthService;
