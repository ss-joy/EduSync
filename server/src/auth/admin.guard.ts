import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGurd implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { token } = request.cookies;
    if (!token) throw new UnauthorizedException('You are not authenticated');
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      if (!decoded.roles.includes('admin')) {
        throw new ForbiddenException('You are not admin');
      }
    } catch (error) {
      throw new ForbiddenException('You are not admin');
    }
    return true;
  }
}
