export class JwtPayloadDto {
  sub: string;
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
}
