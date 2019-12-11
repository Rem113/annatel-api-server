import validator from "validate.js";

const constraints = {
  email: {
    presence: {
      message: "Please enter an email"
    },
    format: {
      pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "Please enter a valid email"
    }
  },
  password: {
    presence: {
      message: "Please enter a password"
    },
    length: {
      minimum: 8,
      tooShort: "Password should be at least 8 characters",
      maximum: 20,
      tooLong: "Password should be maximum 20 characters"
    }
  }
};

export default user => validator.validate(user, constraints);
