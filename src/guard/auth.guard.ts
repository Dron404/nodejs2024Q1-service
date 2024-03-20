import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    try {
      if (!authHeader) {
        throw new UnprocessableEntityException(
          'Authorization header is missing!',
        );
      }
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new UnprocessableEntityException('Unexpected format');
      }
      const token = parts[1];
      await this.jwt.verifyAsync(token);
      return true;
    } catch {
      throw new UnauthorizedException('Unexpected token');
    }
  }
}
