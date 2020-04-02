import { Router } from "express";

import User from "../models/user";
import validateUser from "../core/validation/validate_user";
import AuthRepository from "../repositories/auth_repository";
import AuthService from "../services/auth_service";

const router = Router();

const authRepository = AuthRepository({ userModel: User });
const authService = AuthService({
  repository: authRepository,
  validation: validateUser
});

// TODO: Document
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  if (result.errors) return res.status(400).json(result);

  return res.status(200).json(result);
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.register({ email, password });

  if (result.errors) return res.status(400).json(result);

  return res.status(201).json(result);
});

export default router;
