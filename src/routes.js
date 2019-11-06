import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Raiff Said',
    email: 'raiff.said@gmail.com',
    password_hash: '1721642'
  });

  return res.json(user);
});

export default routes;
