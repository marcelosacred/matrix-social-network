import { Controller, Get, Post, Body, Param, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    console.log('=== Users Controller ===');
    console.log('Request user:', req.user);
    console.log('Headers:', req.headers);
    
    try {
      const profile = await this.usersService.getProfile(req.user.userId);
      console.log('Profile result:', profile);
      return profile;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  }

  @Post()
  create(@Body() createUserDto: RegisterDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
