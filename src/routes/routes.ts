import { Router } from 'express';
import { UserService } from '../services/UserService';
import { EventsService } from '../services/EventsService';

const routes = Router();

const userService = new UserService();
const eventsService = new EventsService();

routes.get('/', (req, res) => {
  return res.json('Hello world!');
});

// User Routes
routes.post('/user/create', async (req, res) => {
  const data = req.body;
  await userService.create(
    data.name,
    data.email,
    data.birthday,
    data.address,
    data.urlImage,
  );
  return res.status(200).json(data);
});

routes.get('/user/listAll', async (req, res) => {
  const listAll = await userService.listAll();
  return res.status(200).json(listAll);
});

// Events Routes
routes.post('/events/create/:userId', async (req, res) => {
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

routes.get('/events/listAll', async (req, res) => {
  const listAll = await eventsService.listAll();
  return res.status(200).json(listAll);
});

export { routes };
