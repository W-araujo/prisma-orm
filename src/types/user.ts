import { User } from '@prisma/client';

export interface IUserMethods {
  create(
    name: string,
    email: string,
    birthday: Date,
    address: string,
    urlImage: string,
  ): Promise<User>;
  listAll(): Promise<User[]>;
}
