const { parseBearerToken } = await import('#src/common/auth/auth-context');

describe('parseBearerToken', () => {
  it('extracts the token from a valid Bearer header', () => {
    const request = { headers: { authorization: 'Bearer abc123' } };

    expect(parseBearerToken(request)).toBe('abc123');
  });

  it('returns null when the Authorization header is missing', () => {
    const request = { headers: {} };

    expect(parseBearerToken(request)).toBeNull();
  });

  it('returns null when the header does not use the Bearer scheme', () => {
    const request = { headers: { authorization: 'Basic abc123' } };

    expect(parseBearerToken(request)).toBeNull();
  });

  it('returns null when the token part is empty', () => {
    const request = { headers: { authorization: 'Bearer ' } };

    expect(parseBearerToken(request)).toBeNull();
  });
});
