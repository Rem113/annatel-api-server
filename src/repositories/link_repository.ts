import { Model } from "mongoose";

import { ILink } from "../models/link.model";
import { IUser } from "../models/user.model";
import { IWatch } from "../models/watch.model";

export default class LinkRepository {
  linkModel: Model<ILink>;

  constructor(linkModel: Model<ILink>) {
    this.linkModel = linkModel;
  }

  async createLink(userId: IUser["_id"], watchId: IWatch["_id"], name: string) {
    const link = { user: userId, watch: watchId };
    // TODO: Catch exceptions
    const exists = await this.linkModel.findOne(link).exec();

    if (exists) throw "The link already exists";

    return this.linkModel.create({ ...link, name });
  }

  findLink(
    userId: IUser["_id"],
    watchId: IWatch["_id"]
  ): Promise<ILink | null> {
    // TODO: Catch exceptions
    return this.linkModel.findOne({ user: userId, watch: watchId }).exec();
  }

  async updateLink(
    userId: IUser["_id"],
    watchId: IWatch["_id"],
    value: ILink
  ): Promise<ILink> {
    value.updatedAt = new Date();

    // TODO: Catch exceptions
    await this.linkModel
      .updateOne({ user: userId, watch: watchId }, value)
      .exec();

    return this.findLink(userId, watchId) as Promise<ILink>;
  }
}
