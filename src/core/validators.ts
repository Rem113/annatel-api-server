export interface IValidator {
  validate: (...params: any[]) => string | null;
}

export class EmailValidator implements IValidator {
  static emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  validate(email: string): string | null {
    const emailInput = email.trim();

    if (emailInput.length === 0) return "Please enter an email";

    if (!emailInput.match(EmailValidator.emailRegex))
      return "Please enter a valid email";

    return null;
  }
}

export class PasswordValidator implements IValidator {
  validate(password: string): string | null {
    const passwordInput = password.trim();

    if (passwordInput.length === 0) return "Please enter a password";

    if (passwordInput.length < 8)
      return "Password must be at least 8 characters";

    return null;
  }
}
