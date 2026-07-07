const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    sku: { type: 'string' },
    stock: { type: 'integer' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' }
  }
};

const createProductSchema = {
  body: {
    type: 'object',
    required: ['name', 'price', 'sku'],
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      sku: { type: 'string', minLength: 1 },
      stock: { type: 'integer', minimum: 0 }
    }
  },
  response: {
    201: productSchema
  }
};

const updateProductSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      sku: { type: 'string', minLength: 1 },
      stock: { type: 'integer', minimum: 0 }
    }
  },
  response: {
    200: productSchema
  }
};

const getProductSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  response: {
    200: productSchema
  }
};

const listProductsSchema = {
  response: {
    200: {
      type: 'array',
      items: productSchema
    }
  }
};

const deleteProductSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  }
};

module.exports = {
  productSchema,
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  listProductsSchema,
  deleteProductSchema
};
