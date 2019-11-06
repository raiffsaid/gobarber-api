import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    // Chama o método init da classe Model
    super.init(
      {
        name: sequelize.STRING,
        email: sequelize.STRING,
        password_hash: sequelize.STRING,
        provider: sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
  }
}

export default User;
