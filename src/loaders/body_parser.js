import bodyParser from "body-parser";

export default async app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
