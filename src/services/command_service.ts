// import { serialize } from "annatel-watch-parser";

import CommandRepository from "../repositories/command_repository";
import WatchRepository from "../repositories/watch_repository";

// TODO: Document
// const validateParams = (actionsType, params) => {
//   const objParams = new Object(params);

//   switch (actionType) {
//     case "UPLOAD":
//       return objParams.hasOwnProperty("interval");
//     case "CENTER":
//       return objParams.hasOwnProperty("centerNumber");
//     case "SLAVE":
//       return objParams.hasOwnProperty("assistanceNumber");
//     case "PW":
//       return objParams.hasOwnProperty("password");
//     case "CALL":
//       return objParams.hasOwnProperty("phoneNumber");
//     case "SMS":
//       return (
//         objParams.hasOwnProperty("phoneNumber") &&
//         objParams.hasOwnProperty("message")
//       );
//     case "SOS":
//     case "SOS1":
//     case "SOS2":
//     case "SOS3":
//       return objParams.hasOwnProperty("sosNumber");
//     default:
//       return true;
//   }
// };

// const mapActionToObject = (watch, actionType, params) => {
//   const isValid = validateParams();

//   const temp = {
//     vendor: watch.vendor,
//     watchId: watch.watchId,
//     actionType,
//     payload: () => {
//       switch (actionType) {
//         case "UPLOAD":
//           return { interval: params.interval };
//         case "CENTER":
//           return { centerNumber: params.centerNumber };
//         case "SLAVE":
//           return { assistanceNumber: params.assistanceNumber };
//         case "PW":
//           return { password: params.password };
//       }
//     },
//   };
// };

export default class CommandService {
  commandRepository: CommandRepository;
  watchRepository: WatchRepository;

  constructor(
    commandRepository: CommandRepository,
    watchRepository: WatchRepository
  ) {
    this.commandRepository = commandRepository;
    this.watchRepository = watchRepository;
  }
}
