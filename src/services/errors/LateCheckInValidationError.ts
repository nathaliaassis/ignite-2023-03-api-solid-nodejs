export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check-in cannot be validated after 20 minutes it has been checked');
  }
}
