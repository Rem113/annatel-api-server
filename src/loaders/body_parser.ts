import { Express } from "express";
import bodyParser from "body-parser";

export default (app: Express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  console.log("Body parser initialized");
};
