'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
          isEmail: true
      },
      password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      createdAt:{
        type: Sequelize.DataTypes.DATE
      },
      updatedAt:{
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
     return queryInterface.dropTable('Users');
     
  }
};

