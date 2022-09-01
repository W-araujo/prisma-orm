import { Events } from '@prisma/client';

export interface IEventsMethods {
  create(
    title: string,
    description: string,
    initialDate: Date,
    finalDate: Date,
    userId: number,
    value: number,
  ): Promise<Events>;
  listAll(): Promise<User[]>;
}
