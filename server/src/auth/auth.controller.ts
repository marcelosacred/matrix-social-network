import { Controller, Post, Body, UseGuards, Request, UnauthorizedException, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { multerConfig } from '../config/multer.config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login attempt for:', loginDto.email);
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('User validated:', user);
    const result = await this.authService.login(user);
    console.log('Login result:', result);
    return result;
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto.email, registerDto.password);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('complete-profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async completeProfile(
    @Request() req,
    @Body() completeProfileDto: CompleteProfileDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    try {
      const result = await this.authService.completeProfile(
        req.user.userId,
        completeProfileDto,
        avatar
      );
      return result;
    } catch (error) {
      console.error('Profile completion error:', error);
      throw new InternalServerErrorException('Failed to complete profile');
    }
  }
}
