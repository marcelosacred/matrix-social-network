import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendStatus } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async sendFriendRequest(userId: string, friendId: string) {
    return this.prisma.friends.create({
      data: {
        userId,
        friendId,
        status: FriendStatus.PENDING,
      },
    });
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    return this.prisma.friends.updateMany({
      where: {
        AND: [
          { userId: friendId },
          { friendId: userId },
          { status: FriendStatus.PENDING }
        ],
      },
      data: {
        status: FriendStatus.ACCEPTED,
      },
    });
  }

  async getFriends(userId: string) {
    return this.prisma.friends.findMany({
      where: {
        OR: [
          { userId, status: FriendStatus.ACCEPTED },
          { friendId: userId, status: FriendStatus.ACCEPTED },
        ],
      },
      select: {
        user: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  }
}
