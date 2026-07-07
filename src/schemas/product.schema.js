import { buildSuccessResponse } from '#common-schemas/response.schema';

const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    sku: { type: 'string' },
    stock: { type: 'integer' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const listProductsSchema = {
  response: {
    200: buildSuccessResponse({ type: 'array', items: productSchema })
  }
};

export const getProductSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  },
  response: {
    200: buildSuccessResponse(productSchema)
  }
};

export const createProductSchema = {
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
    201: buildSuccessResponse(productSchema)
  }
};

export const updateProductSchema = {
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
    200: buildSuccessResponse(productSchema)
  }
};

export const deleteProductSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer' } }
  }
};
