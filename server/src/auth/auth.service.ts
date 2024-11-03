import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordUtil } from '../shared/utils/password.util';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await PasswordUtil.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log('Creating token with payload:', payload);
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await PasswordUtil.hash(password);
    const user = await this.usersService.create({ 
      email, 
      password: hashedPassword,
      isProfileCompleted: false
    });

    const { password: _, ...result } = user;
    return {
      access_token: this.jwtService.sign({ 
        email: user.email, 
        sub: user.id,
        isProfileCompleted: false 
      })
    };
  }

  async completeProfile(
    userId: string,
    profileData: CompleteProfileDto,
    avatar?: Express.Multer.File,
  ) {
    try {
      console.log('Processing avatar:', avatar);
      const avatarUrl = avatar ? await this.uploadAvatar(avatar) : null;
      console.log('Avatar URL:', avatarUrl);

      return await this.prisma.$transaction(async (prisma) => {
        const userProfile = await prisma.userProfile.create({
          data: {
            userId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            dateOfBirth: new Date(profileData.dateOfBirth),
            avatar: avatarUrl,
          },
        });

        console.log('Created profile:', userProfile);

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { isProfileCompleted: true },
        });

        return this.login(updatedUser);
      });
    } catch (error) {
      console.error('Profile completion error:', error);
      throw new Error('Failed to complete profile: ' + error.message);
    }
  }

  private async uploadAvatar(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }
    return `/uploads/avatars/${file.filename}`;
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
