import { SetMetadata } from '@nestjs/common';
import { DefaultRoles } from 'src/modules/acl/enum/default-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: DefaultRoles[]) =>
  SetMetadata(ROLES_KEY, roles);
