import { Router } from 'express';
import { EventsService } from '../services/EventsService';

const eventsRouter = Router();

const eventsService = new EventsService();

eventsRouter.post('/create/:userId', async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;
  await eventsService.create(
    data.title,
    data.description,
    data.initialDate,
    data.finalDate,
    Number(userId),
    data.value,
  );
  return res.status(200).json(data);
});

eventsRouter.get('/listAll', async (req, res) => {
  const listAll = await eventsService.listAll();
  return res.status(200).json(listAll);
});

export default eventsRouter;
