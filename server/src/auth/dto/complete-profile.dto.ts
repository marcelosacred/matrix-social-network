import { ApiProperty } from '@nestjs/swagger';

export class CompleteProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty({ required: false })
  avatar?: Express.Multer.File;
}