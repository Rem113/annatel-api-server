import { Model } from "mongoose";
import { IWatch } from "../models/watch.model";
import { ILink } from "../models/link.model";
import { IUser } from "../models/user.model";

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
    return this.watchModel.findById(id).exec();
  }

  getWatchByWatchId(watchId: IWatch["watchId"]): Promise<IWatch | null> {
    return this.watchModel.findOne({ watchId }).exec();
  }

  async getUsersWatches(userId: IUser["_id"]): Promise<IWatch[]> {
    const usersWatches = await this.linkModel.find({ user: userId });

    const res: IWatch[] = [];

    for await (const userToWatch of usersWatches) {
      const temp = await this.watchModel.findById(userToWatch.watch).exec();

      if (temp !== null) res.push(temp);
    }

    return res;
  }
}
