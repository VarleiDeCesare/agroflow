import { ApiProperty } from '@nestjs/swagger';

export class Upload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  originalname?: string;

  @ApiProperty({ required: false })
  mimetype?: string;

  @ApiProperty({ required: false })
  size?: number;

  @ApiProperty({ required: false })
  url?: string;

  @ApiProperty({ required: false })
  created_at: Date;

  @ApiProperty({ required: false })
  updated_at: Date;
}
