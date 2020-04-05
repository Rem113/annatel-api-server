import bodyParser from "body-parser";

export default (app: any) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  console.log("Body parser initialized");
};
