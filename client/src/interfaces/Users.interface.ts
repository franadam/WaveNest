export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  roles: UserRole;
  chart: string[];
  history: string[];
  verified: boolean;
  token: string;
}
