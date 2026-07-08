import { buildSuccessResponse } from '#common-schemas/response.schema';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    role: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

const userWithTokenSchema = {
  type: 'object',
  properties: {
    ...userSchema.properties,
    token: { type: 'string' }
  }
};

export const listUsersSchema = {
  security: [{ bearerAuth: [] }],
  response: {
    200: buildSuccessResponse({ type: 'array', items: userSchema })
  }
};

export const getUserSchema = {
  security: [{ bearerAuth: [] }],
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
    201: buildSuccessResponse(userWithTokenSchema)
  }
};

export const updateUserSchema = {
  security: [{ bearerAuth: [] }],
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
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  }
};
