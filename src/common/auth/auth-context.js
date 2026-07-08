export function parseBearerToken(request) {
  const header = request.headers['authorization'];
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7).trim() || null;
}

export function setIdentity(request, identity) {
  request.requestContext.set('identity', identity);
}

export function getIdentity(request) {
  return request.requestContext.get('identity');
}
