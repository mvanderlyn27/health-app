'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Dish', {
        name:{
            
        }
    });
    await queryInterface.createTable('Exercise', {

    });
    await queryInterface.createTable('Goal', {

    });
    await queryInterface.createTable('HealthLog', {

    });
    await queryInterface.createTable('Meal', {

    });
    await queryInterface.createTable('MealPlan', {

    });
    await queryInterface.createTable('ProgressPicture', {

    });
    await queryInterface.createTable('Workout', {

    });
    await queryInterface.createTable('WorkoutPlan', {

    });
    await queryInterface.createTable('Users', {
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
    });
    await queryInterface.createTable('Dish', {

    });
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

