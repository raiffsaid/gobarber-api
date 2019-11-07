// Importação de módulo é feita primeiro
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      /* Quando nome da propriedade é igual ao nome da variável, podemos reduzir
       passando apenas email ao inves de { email: email } */
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match'
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
