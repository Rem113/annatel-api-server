import Keys from "../config/keys";

import authRoutes from "../api/auth";
import actionRoutes from "../api/action";

export default app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/action", actionRoutes);

  app.listen(Keys.expressPort);
};
