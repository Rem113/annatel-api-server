import { Model } from "mongoose";

import { ILink } from "../models/link.model";
import { IUser } from "../models/user.model";
import { IWatch } from "../models/watch.model";

export default class WatchRepository {
  watchModel: Model<IWatch>;
  linkModel: Model<ILink>;

  constructor(watchModel: Model<IWatch>, linkModel: Model<ILink>) {
    this.watchModel = watchModel;
    this.linkModel = linkModel;
  }

  createWatch(watch: IWatch): Promise<IWatch> {
    return this.watchModel.create(watch);
  }

  getWatchById(id: IWatch["_id"]): Promise<IWatch | null> {
    // TODO: Catch exceptions
    return this.watchModel.findById(id).exec();
  }

  getWatchByWatchId(watchId: IWatch["watchId"]): Promise<IWatch | null> {
    // TODO: Catch exceptions
    return this.watchModel.findOne({ watchId }).exec();
  }

  async getUsersWatches(userId: IUser["_id"]): Promise<IWatch[]> {
    // TODO: Catch exceptions
    const links = await this.linkModel.find({ user: userId });

    const res: IWatch[] = [];

    for await (const link of links) {
      // TODO: Catch exceptions
      const temp = await this.watchModel.findById(link.watch).exec();

      if (temp !== null) res.push(temp);
    }

    return res;
  }
}
