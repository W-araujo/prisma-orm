import { Router } from 'express';
import { UserService } from '../services/UserService';

const routes = Router();

const userService = new UserService();

routes.get('/', (req, res) => {
  return res.json('Hello world!');
});

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

export { routes };
