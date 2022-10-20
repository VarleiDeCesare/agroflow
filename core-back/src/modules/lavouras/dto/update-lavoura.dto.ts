import { PartialType } from '@nestjs/swagger';
import { CreateLavouraDto } from './create-lavoura.dto';

export class UpdateLavouraDto extends PartialType(CreateLavouraDto) {}
