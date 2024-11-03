import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('=== JwtAuthGuard ===');
    console.log('Checking authentication...');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('=== JWT Guard Handle Request ===');
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
