import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Role.belongsToMany(models.User, { through: UserRole, as: 'users', foreignKey: 'role_id', onDelete: 'cascade' });
      models.User.belongsToMany(models.Role, { through: UserRole, as: 'roles', foreignKey: 'user_id', onDelete: 'cascade' });
    }
  }
  UserRole.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserRole',
    timestamps: false,
  });
  return UserRole;
};
