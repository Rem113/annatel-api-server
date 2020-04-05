import { Model } from "mongoose";

import { ILink } from "../models/link.model";
import { IUser } from "../models/user.model";
import { IWatch } from "../models/watch.model";

export default class LinkRepository {
  linkModel: Model<ILink>;

  constructor(linkModel: Model<ILink>) {
    this.linkModel = linkModel;
  }

  async linkWatchToUser(userId: IUser["_id"], watchId: IWatch["_id"]) {
    const link = { user: userId, watch: watchId };
    const exists = await this.linkModel.findOne(link).exec();

    if (exists) throw "The link already exists";

    return this.linkModel.create(link);
  }
}
