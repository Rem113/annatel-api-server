import LinkRepository from "../repositories/link_repository";
import { IUser } from "../models/user.model";
import { ILink } from "../models/link.model";

export default class LinkService {
  linkRepository: LinkRepository;

  constructor(linkRepository: LinkRepository) {
    this.linkRepository = linkRepository;
  }

  getUsersLinks(userId: IUser["_id"]): Promise<ILink[]> {
    return this.linkRepository.getUsersLinks(userId);
  }
}
