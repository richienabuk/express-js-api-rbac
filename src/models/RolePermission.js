import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Role.belongsToMany(models.Permission, { through: RolePermission, as: 'permissions', foreignKey: 'role_id', onDelete: 'cascade' });
      models.Permission.belongsToMany(models.Role, { through: RolePermission, as: 'roles', foreignKey: 'permission_id', onDelete: 'cascade' });
    }
  }
  RolePermission.init({
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
    timestamps: false,
  });
  return RolePermission;
};
