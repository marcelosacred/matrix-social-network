import { Controller, Post, Get, Param, UseGuards, Request } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('request/:friendId')
  sendFriendRequest(@Param('friendId') friendId: string, @Request() req) {
    return this.friendsService.sendFriendRequest(req.user.id, friendId);
  }

  @Post('accept/:friendId')
  acceptFriendRequest(@Param('friendId') friendId: string, @Request() req) {
    return this.friendsService.acceptFriendRequest(req.user.id, friendId);
  }

  @Get()
  getFriends(@Request() req) {
    return this.friendsService.getFriends(req.user.id);
  }
}
