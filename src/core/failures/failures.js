class Failure {
  constructor(message, payload) {
    this.message = message;
    this.payload = payload;
  }
}

export class AuthFailure extends Failure {}

export class MissingFieldFailure extends Failure {}

export class ConflictingResourceFailure extends Failure {}
