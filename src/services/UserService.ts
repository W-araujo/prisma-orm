import { IUserMethods } from '../@types/user';
import { User } from '@prisma/client';
import { prisma } from '../prisma/utils/client'

class UserService implements IUserMethods {
  async create(name: string, email: string, birthday: Date, address: string, urlImage: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        birthday,
        address,
        urlImage,
      },
    });

    return user;
  }

  async listAll(page: number, pageSize: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        events: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return users;
  }
}

export { UserService };
