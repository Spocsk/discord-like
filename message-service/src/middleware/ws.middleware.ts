import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthWsMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private http: HttpService,
  ) {}

  async use(socket: Socket, next: (err?: Error) => void) {
    try {
      const token = socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Authorization token is missing');
      }

      try {
        await this.jwtService.verifyAsync(token);
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException('Authorization token is invalid');
      }

      try {
        const response = await this.http
          .get('http://localhost:3000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .toPromise();

        if (response.status !== 200 || !response.data) {
          throw new UnauthorizedException('User validation failed');
        }

        socket.data.user = response.data;

        next();
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException('User validation failed');
      }
    } catch (error) {
      console.log(error);
      next(new UnauthorizedException('Unauthorized'));
    }
  }
}
