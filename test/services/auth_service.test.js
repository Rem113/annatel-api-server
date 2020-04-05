import bcrypt from "bcryptjs";

import AuthService from "../../src/services/auth_service";

const tEmail = "remi.saal@gmail.com";
const tPassword = "password";
const tInvalidPassword = "short";

const tUser = {
  _id: "1234",
  email: tEmail,
  password: tPassword,
};

const tDbUser = {
  _id: "1234",
  email: tEmail,
  password: bcrypt.hashSync(tPassword, 10),
};

const tError = {
  error: "error",
};

const successfulValidate = jest.fn((_) => undefined);
const failingValidate = jest.fn((_) => tError);

const nullReturningFindUserByEmail = jest.fn(async (_) =>
  Promise.resolve(null)
);
const userReturningFindUserByEmail = jest.fn(async (_) =>
  Promise.resolve(tDbUser)
);

const mockCreateUser = jest.fn(async () => Promise.resolve(tDbUser));

describe("register", () => {
  it("should return an error when the input is invalid", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: nullReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = new AuthService(authRepository, failingValidate);

    // Act
    const result = await authService.register(tUser);

    // Assert
    expect(result.isRegistered).toBeFalsy();
    expect(result.errors).toEqual(tError);
    expect(authRepository.createUser).toHaveBeenCalledTimes(0);
  });

  it("should return an error when the email is taken", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: userReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = new AuthService(authRepository, successfulValidate);

    // Act
    const result = await authService.register(tUser);

    // Assert
    expect(result.isRegistered).toBeFalsy();
    expect(result.errors).toBeDefined();
    expect(userReturningFindUserByEmail).toHaveBeenCalledWith(tEmail);
    expect(userReturningFindUserByEmail).toHaveBeenCalledTimes(1);
  });

  it("should register the user when everything is ok", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: nullReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = new AuthService(authRepository, successfulValidate);

    // Act
    const result = await authService.register(tUser);

    // Assert
    expect(result.isRegistered).toBeTruthy();
    expect(result.errors).toBeUndefined();
    expect(nullReturningFindUserByEmail).toHaveBeenCalledWith(tEmail);
    expect(nullReturningFindUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith(tUser);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
  });
});

describe("login", () => {
  it("should return an error when the email is invalid", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: nullReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = new AuthService(authRepository, failingValidate);

    // Act
    const result = await authService.login(tUser);

    // Assert
    expect(result.isLoggedIn).toBeFalsy();
    expect(result.errors).toEqual(tError);
    expect(failingValidate).toHaveBeenCalledWith(tUser);
    expect(failingValidate).toHaveBeenCalledTimes(1);
  });

  it("should return an error when the email doesn't exist", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: nullReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = new AuthService(authRepository, successfulValidate);

    // Act
    const result = await authService.login(tUser);

    // Assert
    expect(result.isLoggedIn).toBeFalsy();
    expect(result.errors).toBeDefined();
    expect(nullReturningFindUserByEmail).toHaveBeenCalledWith(tEmail);
    expect(nullReturningFindUserByEmail).toHaveBeenCalledTimes(1);
  });

  it("should return an error when the password doesn't match", async () => {
    // Arrange
    const authRepository = {
      findUserByEmail: userReturningFindUserByEmail,
      createUser: mockCreateUser,
    };
    const authService = AuthService({
      repository: authRepository,
      validation: successfulValidate,
    });

    // Act
    const result = await authService.login({
      email: tEmail,
      password: tInvalidPassword,
    });

    // Assert
    expect(result.isLoggedIn).toBeFalsy();
    expect(result.errors).toBeDefined();
  });

  // it("should login the user when everything is ok", async () => {
  //   // Arrange
  //   const authRepository = {
  //     findUserByEmail: userReturningFindUserByEmail,
  //     createUser: mockCreateUser
  //   };
  //   const authService = AuthService({
  //     repository: authRepository,
  //     validation: successfulValidate
  //   });

  //   // Act
  //   const result = await authService.login(tUser);

  //   // Assert
  //   expect(mockCreateUser).toHaveBeenCalledTimes(0);
  //   expect(successfulValidate).toHaveBeenCalledWith(tUser);
  //   expect(successfulValidate).toHaveBeenCalledTimes(1);
  //   expect(userReturningFindUserByEmail).toHaveBeenCalledWith(tEmail);
  //   expect(userReturningFindUserByEmail).toHaveBeenCalledTimes(1);
  //   expect(result.isLoggedIn).toBeTruthy();
  //   expect(result.payload).toBeDefined();
  //   expect(result.errors).toBeUndefined();
  // });
});
