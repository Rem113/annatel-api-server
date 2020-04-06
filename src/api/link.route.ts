import { Router } from "express";
import passport from "passport";

import Link from "../models/link.model";
import { IUser } from "../models/user.model";

import LinkRepository from "../repositories/link_repository";
import LinkService from "../services/link_service";

const linkRepository = new LinkRepository(Link);
const linkService = new LinkService(linkRepository);

const router = Router();

/**
 * ROUTE:       /
 * METHOD:      GET
 * PROTECTED:   YES
 * BODY:        None
 * DESCRIPTION: Get users links
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = (req.user as IUser)._id;

    const links = await linkService.getUsersLinks(userId);

    return res.status(200).json(links);
  }
);

export default router;
