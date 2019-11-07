// Importando o model de usuário
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Encontrar um usuário onde o email repassado seja igual ao já cadastrado
    const userExists = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists'
      });
    }
    // Retorna a requisição mostrando apenas estes campos
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
