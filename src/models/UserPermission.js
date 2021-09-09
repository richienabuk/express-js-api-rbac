import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Permission.belongsToMany(models.User, { through: UserPermission, as: 'users', foreignKey: 'permission_id', onDelete: 'cascade' });
      models.User.belongsToMany(models.Permission, { through: UserPermission, as: 'permissions', foreignKey: 'user_id', onDelete: 'cascade' });
    }
  }
  UserPermission.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserPermission',
    timestamps: false,
  });
  return UserPermission;
};
