import { Router } from "express";

import User from "../models/user";
import validateUser from "../core/validation/validate_user";
import UserRepository from "../repositories/user_repository";
import AuthService from "../services/auth_service";
import { InternalFailure, InvalidInputFailure } from "../core/failures";

const router = Router();

const userRepository = UserRepository({ userModel: User });
const authService = new AuthService({
  userRepository,
  validation: validateUser
});

/**
 * ROUTE:       /login
 * METHOD:      POST
 * PROTECTED:   NO
 * BODY:        email
 *              password
 * DESCRIPTION: Returns a token identifing the user
 */
router.post("/login", async (req, res) => {
  const result = await authService.login(req.body);

  return result.fold(
    err => {
      if (err instanceof InternalFailure)
        return res.status(500).json(err.unwrap());
      if (err instanceof InvalidInputFailure)
        return res.status(400).json(err.unwrap());
    },
    token => res.status(200).json({ token })
  );
});

/**
 * ROUTE:       /register
 * METHOD:      POST
 * PROTECTED:   NO
 * BODY:        email
 *              password
 * DESCRIPTION: Returns the newly created user
 */
router.post("/register", async (req, res) => {
  const result = await authService.register(req.body);

  return result.fold(
    err => {
      if (err instanceof InternalFailure)
        return res.status(500).json(err.unwrap());
      if (err instanceof InvalidInputFailure)
        return res.status(400).json(err.unwrap());
    },
    user => res.status(201).json({ user })
  );
});

export default router;
