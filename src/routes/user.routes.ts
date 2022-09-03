import { Router } from 'express';
import { UserService } from '../services/UserService';

const userRouter = Router();

const userService = new UserService();

userRouter.post('/create', async (req, res) => {
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

userRouter.get('/listAll', async (req, res) => {
  const listAll = await userService.listAll();
  return res.status(200).json(listAll);
});

export default userRouter;
