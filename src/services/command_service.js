import { objectToString } from "annatel-watch-parser";

export default ({ commandRepository }) =>
  Object.freeze({
    createLKCommand: watchId => {
      const command = {
        watchId,
        command: objectToString({
          watchId,
          actionType: "LK",
          length: 0
        })
      };

      commandRepository.create(command).catch(err => console.error(err));
    }
  });
