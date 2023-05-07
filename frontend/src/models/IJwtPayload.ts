export interface IJwtPayload {
  sub: string;
  username: string;
  id: number;
  iat: number;
  iss: string;
  exp: number;
}
