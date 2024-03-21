import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  constructor() { }

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

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken['exp']) {
      return true;
    }
    const expirationTime = decodedToken['exp'] * 1000;
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  isTokenAudienceValid(token: string, expectedAudience: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken['aud']) {
      return false;
    }
    return decodedToken['aud'] === expectedAudience;
  }

  hasRequiredClaims(token: string, requiredClaims: string[]): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }
    return requiredClaims.every(claim => decodedToken.hasOwnProperty(claim));
  }
}
