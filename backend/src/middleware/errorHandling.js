//imports
const UserService = require('../services/user_service')

//user auth 
function userAuthErrorHandler(error, req, res, next) {
  if (error instanceof UserValidationError) {
    res.status(HttpStatus.UNAUTHORIZED);
    return res.send({
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: error.message
    });
  }
  next(error);
}
class UserValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserIdValidationError'
  }
}
//input validation
function inputValidationErrorHandler(error, request, response, next) {
  if (error instanceof InputValidationError) {
    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        httpStatus: HttpStatus.BAD_REQUEST,
        message: error.message,
        validationErrors: error.validationErrors
      });
  }
  next(error);
}

class InputValidationError extends Error {
  constructor(message, validationErrors) {
    super(message);
    this.validationErrors = validationErrors;
    this.name = 'ValidationError'
  }
}
//not found
function notFoundErrorHandler(error, req, res, next) {
  if (error instanceof NotFoundError) {
    return res.status(HttpStatus.NOT_FOUND).send({
      httpStatus: HttpStatus.NOT_FOUND,
      message: error.message,
      error: {}
    });
  }
  next(error);
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError'
  }
}
//already exists
function alreadyExistingErrorHandler(error, req, res, next) {
  if (error instanceof AlreadyExistingError) {
    return res.status(HttpStatus.CONFLICT).send({
      httpStatus: HttpStatus.CONFLICT,
      message: error.message,
      error: {}
    });
  }
  next(error);
}
class AlreadyExistingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlreadyExistingError'
  }
}
//postgres error
function databaseErrorHandler(error, request, response, next) {
  if (error instanceof DatabaseError) {
    if (error.code === 11000) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({
          httpStatus: HttpStatus.CONFLICT,
          type: 'DatabaseError',
          message: error.message
        });
    } else {
      return response.status(503).json({
        httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
        type: 'DatabaseError',
        message: error.message
      });
    }
  }
  next(error);
};

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PostgresError'
  }
}
//unauthorized error
function unauthorizedUserErrorHandler(error, req, res, next) {
  if (error instanceof UnauthorizedUserError) {
    return res.status(HttpStatus.CONFLICT).send({
      httpStatus: HttpStatus.CONFLICT,
      message: error.message,
      error: {}
    });
  }
  next(error);
}
class UnauthorizedUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized User'
  }
}

//default error catcher
function defaultErrorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  } else {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.send({
      message: error.message,
      error: {}
    });
  }
}
module.exports = {
  userAuthErrorHandler, UserValidationError,
  inputValidationErrorHandler, InputValidationError,
  notFoundErrorHandler, NotFoundError,
  alreadyExistingErrorHandler, AlreadyExistingError,
  databaseErrorHandler, DatabaseError,
  unauthorizedUserErrorHandler, UnauthorizedUserError,
  defaultErrorHandler,
}
