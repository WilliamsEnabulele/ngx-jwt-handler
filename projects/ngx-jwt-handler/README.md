# ngx-jwt-handler

`ngx-jwt-handler` is an Angular library that provides services for managing JSON Web Tokens (JWT) and handling sessions in Angular applications. It includes a JWT handler service for decoding and managing JWT tokens, a session handler service for managing browser sessions, and an interceptor for adding JWT tokens to HTTP requests.

## Installation

You can install `ngx-jwt-handler` via npm:

```bash
npm install ngx-jwt-handler
```

## Usage

JWT Handler Service
The JWT handler service allows you to decode JWT tokens and check their expiration.

```typescript
import { JwtHandlerService } from 'ngx-jwt-handler';

// Inject JwtHandlerService in your component or service
constructor(private jwtHandlerService: JwtHandlerService) {}

// Decode a JWT token
const decodedToken = this.jwtHandlerService.decodeToken(token);

// Check if a token is expired
const isTokenExpired = this.jwtHandlerService.isTokenExpired(token);

// Check if a token audience is valid
const isTokenAudienceValid = this.jwtHandlerService.isTokenAudienceValid(token, audience);

// Check if token claims are present
const hasRequiredClaims = this.jwtHandlerService.hasRequiredClaims(token, claims[]);

```

Session Handler Service
The session handler service provides methods for managing browser sessions.

```typescript
import { SessionHandlerService } from 'ngx-jwt-handler';

// Inject SessionService in your component or service
constructor(private sessionService: SessionHandlerService) {}

this.sessionService.add('accessToken', 'token');

this.sessionService.remove('accessToken');

this.sessionService.get('accessToken');

this.sessionService.has('accessToken');

this.sessionService.clear();

```

JWT Interceptor
The JWT interceptor automatically adds JWT tokens to HTTP requests.

```typescript
import { TokenInterceptor } from 'ngx-jwt-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Include TokenInterceptor in your providers array
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
]

```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
