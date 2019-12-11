import mongoose from "mongoose";

import Action from "../../src/models/action";
import ActionRepository from "../../src/repositories/action_repository";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {});
});

afterEach(async () => {
  await Action.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("getActions", () => {
  it("should return the actions", async () => {
    // Arrange
    const newAction = {
      vendor: "3G",
      length: 100,
      actionType: "LK"
    };
    await Action.create(newAction);
    const actionRepository = ActionRepository({ actionModel: Action });

    // Act
    const result = await actionRepository.getActions();

    // Assert
    expect(result).not.toEqual([]);
    expect(result.length).toBe(1);
    expect(result[0]._id).toBeDefined();
    expect(result[0].vendor).toEqual("3G");
    expect(result[0].length).toBe(100);
    expect(result[0].actionType).toEqual("LK");
  });
});

describe("createAction", () => {
  it("should create the action when valid", async () => {
    // Arrange
    const newAction = {
      vendor: "3G",
      length: 100,
      actionType: "LK"
    };
    const actionRepository = ActionRepository({ actionModel: Action });

    // Act
    const result = await actionRepository.createAction(newAction);

    // Assert
    expect(result._id).toBeDefined();
    expect(result.vendor).toEqual("3G");
    expect(result.length).toBe(100);
    expect(result.actionType).toEqual("LK");
  });
});
