import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // Returna apenas prestadores com os campos listados em attributes
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url']
        }
      ]
    });

    return res.json(providers);
  }
}

export default new ProviderController();