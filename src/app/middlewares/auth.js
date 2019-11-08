// Importa a promosify que transforma uma função de callback em async/await
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      error: 'Token not provided'
    });
  }

  // Separa a palavra Bearer do Token, retornando em duas posições em um array
  // Desestruração descartando a primeira posição do array
  const [, token] = authHeader.split(' ');

  try {
    // Transforma o jwt.verify de callback para async/await
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid Token'
    });
  }
};
