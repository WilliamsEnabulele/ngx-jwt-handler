import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  constructor() { }

  /**
 * Decodes a JWT token and returns the payload as an object.
 * @param token The JWT token to decode.
 * @returns The decoded payload as an object, or null if decoding fails.
 * @example
 * // Decoding a JWT token
 * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 * const decodedPayload = decodeToken(token);
 * console.log(decodedPayload); // Output: { sub: '1234567890', name: 'John Doe', iat: 1516239022 }
 */
  decodeToken(token: string): { [key: string]: any } | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
 * Checks if a JWT token is expired.
 * @param token The JWT token to check.
 * @returns A boolean indicating whether the token is expired (true) or not (false).
 * @example
 * // Checking if a JWT token is expired
 * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjJ9.qo6lntrV2FVQ1t2RXR7mgpHsXo1-r8YuewfGoK27Nms';
 * const isExpired = isTokenExpired(token);
 * console.log(isExpired); // Output: false
 */
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken['exp']) {
      return true;
    }
    const expirationTime = decodedToken['exp'] * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  /**
 * Checks if the audience of a JWT token matches the expected audience.
 * @param token The JWT token to check.
 * @param expectedAudience The expected audience value to compare against.
 * @returns A boolean indicating whether the token audience matches the expected audience (true) or not (false).
 * @example
 * // Checking if the audience of a JWT token is valid
 * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjIsImF1ZCI6ImF1ZGllbmNlMSJ9.Mf_7LNWcWcrYy-kDf0OuxiOvj-LNT0-4FpCtv0qOL9Y';
 * const expectedAudience = 'audience1';
 * const isAudienceValid = isTokenAudienceValid(token, expectedAudience);
 * console.log(isAudienceValid); // Output: true
 */
  isTokenAudienceValid(token: string, expectedAudience: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken['aud']) {
      return false;
    }
    return decodedToken['aud'] === expectedAudience;
  }

  /**
 * Checks if a JWT token contains all the required claims.
 * @param token The JWT token to check.
 * @param requiredClaims An array of strings representing the required claims.
 * @returns A boolean indicating whether the token contains all the required claims (true) or not (false).
 * @example
 * // Checking if a JWT token has required claims
 * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MTYyMzkwMjIsImF1ZCI6ImF1ZGllbmNlMSJ9.Mf_7LNWcWcrYy-kDf0OuxiOvj-LNT0-4FpCtv0qOL9Y';
 * const requiredClaims = ['sub', 'name', 'iss'];
 * const hasClaims = hasRequiredClaims(token, requiredClaims);
 * console.log(hasClaims); // Output: true
 */
  hasRequiredClaims(token: string, requiredClaims: string[]): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }
    return requiredClaims.every(claim => decodedToken.hasOwnProperty(claim));
  }
}
