class ApplicationError extends Error {
  constructor(message, status, properties) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message ?? 'Something went wrong'

    this.status = status ?? 500

    this.properties = properties ?? null
  }

  toJSON() {
    return {
      error: this.message,
      properties: this.properties,
    }
  }
}

class NotFoundError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Not found', 404, properties)
  }
}

class UserInputError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Bad input', 400, properties)
  }

  static fromValidationError(error) {
    return new UserInputError(error.message, {
      path: error.path,
      errors: error.errors,
    })
  }
}

class AuthorizationError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Authorization is required', 401, properties)
  }
}

class ForbiddenError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Action is forbidded', 403, properties)
  }
}

module.exports = {
  ApplicationError,
  NotFoundError,
  UserInputError,
  AuthorizationError,
  ForbiddenError,
}
