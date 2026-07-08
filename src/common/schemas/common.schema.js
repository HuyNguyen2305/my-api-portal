export const AUTH_HEADERS_SCHEMA = {
  type: 'object',
  required: ['authorization'],
  properties: {
    authorization: { type: 'string', pattern: '^Bearer .+' }
  }
};
