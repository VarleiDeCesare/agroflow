import { User } from '../../user/entities/user.entity';

export class LoginDataDto {
  user: User;
  deviceId?: string;
  os?: string;
  version?: string;
}
