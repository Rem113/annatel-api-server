import validateUser from "../../../src/core/validation/validate_user";

const tValidEmail = "remi.saal@gmail.com";
const tInvalidEmail = "invalidemail";
const tValidPassword = "thisisavalidpassword";
const tShortPassword = "short";

it("should return null when everything is ok", () => {
  const errors = validateUser({ email: tValidEmail, password: tValidPassword });

  expect(errors).toBeUndefined();
});

it("should return an error when the email is undefined", () => {
  const errors = validateUser({ password: tValidPassword });

  expect(errors).toBeDefined();
});

it("should return an error when the password is undefined", () => {
  const errors = validateUser({ email: tValidEmail });

  expect(errors).toBeDefined();
});

it("should return an error when the email is invalid", () => {
  const errors = validateUser({
    email: tInvalidEmail,
    password: tValidPassword
  });

  expect(errors).toBeDefined();
});

it("should return an error when the password is too short", () => {
  const errors = validateUser({
    email: tValidEmail,
    password: tShortPassword
  });

  expect(errors).toBeDefined();
});
