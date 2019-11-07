import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // Chama o método init da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Um campo que vai existir somente no código e não na base de dados
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
    /* Hooks são trechos de códigos executados de forma automática
    baseados em ações que acontecem no model */
    /* Um Hook vai executar o código da função do segundo parâmetro de acordo
    com o primeiro parâmetro (beforeSave), nesse caso, antes de salvar
    na base de dados */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // Criptografando a senha usando bcrypt
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
