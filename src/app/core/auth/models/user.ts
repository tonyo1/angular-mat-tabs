export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  Claims: string[];
  createdAt?: Date;
}