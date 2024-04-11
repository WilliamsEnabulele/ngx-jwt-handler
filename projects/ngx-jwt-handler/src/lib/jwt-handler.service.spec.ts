import { TestBed } from '@angular/core/testing';

import { JwtHandlerService } from './jwt-handler.service';

describe('JwtHandlerService', () => {
  let service: JwtHandlerService;
  const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTY0OTc3NjY2NiwiaWF0IjoxNjQ5Nzc2MDY2fQ.VfUv8FKJSq7WJ8D0LHTQJ5IMQhghRQDrZa3xbrMJdAs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTY0OTc3NjY2NiwiaWF0IjoxNjQ5Nzc2MDY2fQ.VfUv8FKJSq7WJ8D0LHTQJ5IMQhghRQDrZa3xbrMJdAs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTY0OTc3NjY2NiwiaWF0IjoxNjQ5Nzc2MDY2fQ.VfUv8FKJSq7WJ8D0LHTQJ5IMQhghRQDrZa3xbrMJdAs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTY0OTc3NjY2NiwiaWF0IjoxNjQ5Nzc2MDY2fQ.VfUv8FKJSq7WJ8D0LHTQJ5IMQhghRQDrZa3xbrMJdAs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyX2lzc3VlciIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJhdWRpZW5jZSIsImV4cCI6MTY0OTc3NjY2NiwiaWF0IjoxNjQ5Nzc2MDY2fQ.VfUv8FKJSq7WJ8D0LHTQJ5IMQhghRQDrZa3xbrMJdAs"
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  tokens.forEach((data, index) => {
    it(`decode token with index ${index + 1}`, () => {
      const decodedToken = service.decodeToken(data);
      expect(decodedToken).toBeTruthy();
    });
  });


  it('should decode a valid token', () => {
    spyOn(service, 'decodeToken').and.returnValue({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022
    });

    const token = 'dummy.token';
    const decodedToken = service.decodeToken(token);
    expect(decodedToken).toBeTruthy();
    expect(decodedToken?.['sub']).toBe('1234567890');
    expect(decodedToken?.['name']).toBe('John Doe');
    expect(decodedToken?.['iat']).toBe(1516239022);
  });

  it('should return null for invalid token', () => {
    const invalidToken = 'invalid.token';
    const decodedToken = service.decodeToken(invalidToken);
    expect(decodedToken).toBeNull();
  });

  it('should correctly check if a token is expired', () => {
    spyOn(service, 'isTokenExpired').and.returnValue(true);
    const expiredToken = "dummy.token";
    expect(service.isTokenExpired(expiredToken)).toBe(true);
  });

  it('should return true if token audience matches expected audience', () => {
    spyOn(service, 'decodeToken').and.returnValue({ aud: 'expectedAudience' });

    const token = 'dummy.token';
    const expectedAudience = 'expectedAudience';

    expect(service.isTokenAudienceValid(token, expectedAudience)).toBe(true);
  });

  it('should return false if token audience does not match expected audience', () => {
    spyOn(service, 'decodeToken').and.returnValue({ aud: 'unexpectedAudience' });

    const token = 'dummy.token';
    const expectedAudience = 'expectedAudience';

    expect(service.isTokenAudienceValid(token, expectedAudience)).toBe(false);
  });

  it('should return false if token has no audience claim', () => {
    spyOn(service, 'decodeToken').and.returnValue({});

    const token = 'dummy.token';
    const expectedAudience = 'expectedAudience';

    expect(service.isTokenAudienceValid(token, expectedAudience)).toBe(false);
  });

  it('should return true if token has all required claims', () => {
    spyOn(service, 'decodeToken').and.returnValue({ sub: '123', role: 'admin' });

    const token = 'dummy.token';
    const requiredClaims = ['sub', 'role'];

    expect(service.hasRequiredClaims(token, requiredClaims)).toBe(true);
  });

  it('should return false if token is missing required claims', () => {
    spyOn(service, 'decodeToken').and.returnValue({ sub: '123' });

    const token = 'dummy.token';
    const requiredClaims = ['sub', 'role'];

    expect(service.hasRequiredClaims(token, requiredClaims)).toBe(false);
  });

  it('should return false if token is invalid', () => {
    spyOn(service, 'decodeToken').and.returnValue(null);

    const token = 'dummy.token';
    const requiredClaims = ['sub', 'role'];

    expect(service.hasRequiredClaims(token, requiredClaims)).toBe(false);
  });
});
