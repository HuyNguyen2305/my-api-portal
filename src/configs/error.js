export class CustomError extends Error {
  constructor(statusCode, message, options = {}) {
    super(message);
    this.statusCode = statusCode;
    this.options = options;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not found', options = {}) {
    super(404, message, options);
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation failed', options = {}) {
    super(400, message, options);
  }
}

export function setErrorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({
        success: false,
        message: error.message,
        ...error.options
      });
      return;
    }

    if (error.validation) {
      reply.code(400).send({
        success: false,
        message: error.message
      });
      return;
    }

    request.log.error(error);
    reply.code(error.statusCode || 500).send({
      success: false,
      message: 'Internal server error'
    });
  });
}
