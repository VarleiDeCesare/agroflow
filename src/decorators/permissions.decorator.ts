import { SetMetadata } from '@nestjs/common';
import { DefaultPermissions } from 'src/modules/acl/enum/default-permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: DefaultPermissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
