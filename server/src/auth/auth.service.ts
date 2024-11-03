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
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email
      }
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
      const avatarUrl = avatar ? await this.uploadAvatar(avatar) : null;

      // Используем транзакцию для атомарного обновления
      return await this.prisma.$transaction(async (prisma) => {
        // Создаем профиль пользователя
        await prisma.userProfile.create({
          data: {
            userId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            dateOfBirth: new Date(profileData.dateOfBirth),
            avatar: avatarUrl,
          },
        });

        // Обновляем статус заполнения профиля
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { isProfileCompleted: true },
        });

        // Генерируем новый токен
        return this.login(updatedUser);
      });
    } catch (error) {
      // Логируем ошибку для отладки
      console.error('Profile completion error:', error);
      throw new Error('Failed to complete profile: ' + error.message);
    }
  }

  // Метод для загрузки аватара (простой пример)
  private async uploadAvatar(file: Express.Multer.File): Promise<string> {
    // Здесь должна быть реальная логика загрузки файла
    // Это просто пример
    return `uploads/avatars/${file.filename}`;
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
