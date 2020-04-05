import express from "express";
import load from "./loaders";

const main = async () => {
  const app = express();

  await load(app);

  console.log("App loaded!");
};

main();
