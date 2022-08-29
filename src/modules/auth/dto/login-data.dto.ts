import { User } from 'src/modules/users/entities/user.entity';

export class LoginDataDto {
  user: User;
  deviceId?: string;
  os?: string;
  version?: string;
}
