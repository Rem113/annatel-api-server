export abstract class Failure {
  message: string;
  payload?: object;

  constructor(message: string, payload?: object) {
    this.message = message;
    this.payload = payload;
  }

  getType(): string {
    return "Unknown";
  }

  unwrap(): object {
    return {
      error: {
        type: this.getType(),
        message: this.message,
        payload: this.payload,
      },
    };
  }
}

export class InternalFailure extends Failure {
  getType() {
    return "Internal failure";
  }
}

export class InvalidInputFailure extends Failure {
  getType() {
    return "Invalid input";
  }
}

export class ConflictFailure extends Failure {
  getType() {
    return "Conflict";
  }
}
