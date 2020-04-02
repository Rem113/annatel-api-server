class Failure {
  constructor(message, payload) {
    this.message = message;
    this.payload = payload;
  }

  getType() {
    return "Unknown";
  }

  unwrap() {
    return {
      error: {
        type: this.getType(),
        message: this.message,
        payload: this.payload
      }
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
