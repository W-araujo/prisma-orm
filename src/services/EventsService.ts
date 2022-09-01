import { IEventsMethods } from '../@types/events';
import { PrismaClient, Events } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$connect();

class EventsService implements IEventsMethods {
  async create(
    title: string,
    description: string,
    initialDate: Date,
    finalDate: Date,
    userId: number,
    value: number,
  ): Promise<Events> {
    if (!title) throw new Error('Please enter a title');

    const event = await prisma.events.create({
      data: {
        title,
        description,
        initialDate,
        finalDate,
        userId,
        value,
      },
    });

    return event;
  }

  async listAll(): Promise<Events[]> {
    const events = await prisma.events.findMany({
      include: {
        user: true,
      },
    });
    return events;
  }
}

export { EventsService };

prisma.$disconnect();
