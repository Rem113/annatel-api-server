import mongoose from "mongoose";

import AuthRepository from "../../src/repositories/auth_repository";
import User from "../../src/models/user";

const tEmail = "email";
const tPassword = "password";

let authRepository;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  authRepository = AuthRepository({ userModel: User });
});

afterEach(async () => {
  return await User.deleteMany();
});

describe("createUser", () => {
  it("should create a new user", async () => {
    const result = await authRepository.createUser({
      email: tEmail,
      password: tPassword
    });

    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.insertedAt).toBeDefined();
    expect(result.associatedWatches).toBeDefined();
  });
});

describe("findUserByEmail", () => {
  it("should find the user when it exists", async () => {
    const user = await User.create({ email: tEmail, password: tPassword });

    const result = await authRepository.findUserByEmail(tEmail);

    expect(user._id).toEqual(result._id);
  });

  it("should return null when the user doesn't exist", async () => {
    const result = await authRepository.findUserByEmail(tEmail);

    expect(result).toBeNull();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
