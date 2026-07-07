import { buildSuccessResponse } from '#common-schemas/response.schema';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const listUsersSchema = {
  response: {
    200: buildSuccessResponse({ type: 'array', items: userSchema })
  }
};

export const getUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  response: {
    200: buildSuccessResponse(userSchema)
  }
};

export const createUserSchema = {
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' }
    }
  },
  response: {
    201: buildSuccessResponse(userSchema)
  }
};

export const updateUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' }
    }
  },
  response: {
    200: buildSuccessResponse(userSchema)
  }
};

export const deleteUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  }
};
