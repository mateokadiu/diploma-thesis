export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  gender: string;
  dateOfBirth: Date;
  exp?: number;
  iat?: number;
}
