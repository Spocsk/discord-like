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
    console.log(token);

    try {
      client.user = this.jwtService.verify(token);
      console.log(context.switchToWs().getData());
      return true;
    } catch (error) {
      console.log(error);
      throw new WsException('Invalid token');
    }
  }
}
