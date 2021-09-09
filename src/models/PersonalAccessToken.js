import { Model } from 'sequelize';
import { hash, hash_compare } from '../utils/hashing';

const PROTECTED_ATTRIBUTES = ['token'];

export default (sequelize, DataTypes) => {
  class PersonalAccessToken extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PersonalAccessToken.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'owner',
        onDelete: 'CASCADE',
      });

      models.User.hasMany(PersonalAccessToken, {
        foreignKey: 'user_id',
        as: 'tokens',
        onDelete: 'CASCADE',
      });
    }

    /***
     * Verify the token and retrieve the authenticated user for the incoming request.
     * @param authorizationToken
     * @returns {Promise<{user}>}
     */
    static async findToken(authorizationToken) {
      if (authorizationToken) {
        let accessToken;
        if (!authorizationToken.includes('|')) {
          accessToken = await this.findOne({ where: { token: hash(authorizationToken) }, include: 'owner' });
        } else {
          const [id, kToken] = authorizationToken.split('|', 2);
          const instance = await this.findByPk(id, { include: 'owner' });
          if (instance) {
            accessToken = hash_compare(instance.token, hash(kToken)) ? instance : null;
          }
        }

        if (!accessToken) return { user: null, currentAccessToken: null };

        accessToken.last_used_at = new Date(Date.now());
        await accessToken.save();
        return { user: accessToken.owner, currentAccessToken: accessToken.token };
      }

      return { user: null, currentAccessToken: null };
    }
  }
  PersonalAccessToken.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    last_used_at: DataTypes.DATE,
    last_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PersonalAccessToken',
  });

  return PersonalAccessToken;
};
