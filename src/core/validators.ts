import { ITimeFrame, DayOfWeek } from "../models/geofence.model";

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

export class GeofenceValidator implements IValidator {
  validate(
    frames: ITimeFrame[],
    longitude: number,
    latitude: number,
    radius: number,
    name: string,
    notifications: boolean
  ): string | null {
    if (frames === undefined || frames.length === 0)
      return "Please add at least a single time frame";

    for (const frame of frames) {
      if (frame.from >= frame.to) return '"To" must be after "from"';
      if (frame.dayOfWeek < 0 || frame.dayOfWeek > 6)
        return "Day of week ranges between 0 (Sunday) and 6 (Saturday)";
    }

    if (longitude === undefined) return "Please input a longitude";
    if (longitude < -90.0 || longitude > 90.0)
      return "Please innput a valid longitude";

    if (latitude === undefined) return "Please input a latitude";
    if (latitude < -180.0 || latitude > 180.0)
      return "Please innput a valid latitude";

    if (radius === undefined) return "Please input a radius";
    if (radius < 10) return "Radius ranges between 10 and 5000 meters";

    if (name === undefined) return "Please enter a name";
    if (name.trim().length === 0) return "Please enter a valid name";

    if (notifications !== undefined && typeof notifications !== "boolean")
      return "Notifications must be either true or false";

    return null;
  }
}
