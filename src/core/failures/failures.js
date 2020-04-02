class Failure {
  constructor(message, payload) {
    this.message = message;
    this.payload = payload;
  }

  getType() {
    return "Unknown";
  }
}

export class AuthFailure extends Failure {
  getType() {
    return "Auth error";
  }
}

export class MissingFieldFailure extends Failure {
  getType() {
    return "Missing field";
  }
}

export class ConflictingResourceFailure extends Failure {
  getType() {
    return "Conflict";
  }
}
