import { Express } from "express";

import Keys from "../config/keys";

import authRoutes from "../api/auth.route";
import actionRoutes from "../api/action.route";
import commandRoutes from "../api/command.route";
import geofenceRoutes from "../api/geofence.route";
import linkRoutes from "../api/link.route";
import watchRoutes from "../api/watch.route";

export default (app: Express) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/action", actionRoutes);
  app.use("/api/command", commandRoutes);
  app.use("/api/geofence", geofenceRoutes);
  app.use("/api/link", linkRoutes);
  app.use("/api/watch", watchRoutes);

  app.listen(Keys.expressPort);

  console.log("Express initialized");
};
