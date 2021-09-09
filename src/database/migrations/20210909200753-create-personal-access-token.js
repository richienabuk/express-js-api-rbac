export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PersonalAccessTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      last_used_at: {
        type: Sequelize.DATE,
      },
      last_ip_address: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PersonalAccessTokens');
  },
};
