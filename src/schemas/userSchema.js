const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' }
  }
};

const createUserSchema = {
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' }
    }
  },
  response: {
    201: userSchema
  }
};

const updateUserSchema = {
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
    200: userSchema
  }
};

const getUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  response: {
    200: userSchema
  }
};

const listUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: userSchema
    }
  }
};

const deleteUserSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  }
};

module.exports = {
  userSchema,
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  listUsersSchema,
  deleteUserSchema
};
