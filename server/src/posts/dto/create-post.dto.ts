import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  authorId: string;
}
