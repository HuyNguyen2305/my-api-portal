export function buildSuccessResponse(dataSchema) {
  return {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: {
        oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
      },
      data: dataSchema
    }
  };
}
