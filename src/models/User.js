import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class User extends Model {
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
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your phone number',
      },
      unique: {
        args: true,
        msg: 'Phone number already exists',
      },
    },
    password: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('inactive', 'active', 'suspended'),
      defaultValue: 'inactive',
    },
    settings: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
