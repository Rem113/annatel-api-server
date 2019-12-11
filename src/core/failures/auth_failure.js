import Failure from "./failure";

export default class AuthFailure extends Failure {
  constructor(message, payload) {
    this.message = message;
    this.payload = payload;
  }
}
