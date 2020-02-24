import Keys from "../config/keys";

import authRoutes from "../api/auth";
import actionRoutes from "../api/action";
import commandRoutes from "../api/command";

export default app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/action", actionRoutes);
  app.use("/api/command", commandRoutes);

  app.listen(Keys.expressPort);

  console.log("Express initialized");
};
