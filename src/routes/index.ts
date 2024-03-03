import { Router } from 'express';
import userRouter from './user.routes';
import eventsRouter from './events.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/events', eventsRouter);

export { routes };
