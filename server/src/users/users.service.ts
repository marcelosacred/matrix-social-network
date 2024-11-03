import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(registerDto: RegisterDto) {
    return this.prisma.user.create({
      data: registerDto,
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getProfile(userId: string) {
    console.log('=== Users Service ===');
    console.log('Getting profile for userId:', userId);
    
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true
        }
      });
      
      console.log('Database result:', user);
      
      if (!user) {
        throw new NotFoundException('User not found');
      }
      
      return {
        id: user.id,
        email: user.email,
        profile: user.profile
      };
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
    }
  }
}
