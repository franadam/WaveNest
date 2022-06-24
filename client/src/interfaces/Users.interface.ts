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
  cart: string[];
  history: string[];
  verified: boolean;
  token: string;
}

export interface Credentials {
  email: string;
  password: string;
}
