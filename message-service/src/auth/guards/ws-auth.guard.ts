import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake?.headers?.authorization;

    if (!authToken) {
      throw new WsException('Missing authorization token');
    }

    const token = authToken.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      context.switchToWs().getData().user = payload;
      return true;
    } catch (error) {
      throw new WsException('Invalid token');
    }
  }
}
