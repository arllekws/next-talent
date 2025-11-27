'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('programs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      institutionId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'institution_id',
        references: {
          model: 'institutions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      participants: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('open', 'closing-soon', 'closed'),
        allowNull: false,
        defaultValue: 'open',
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      level: {
        type: Sequelize.ENUM('Júnior', 'Pleno', 'Sênior'),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
    });

    // Add indexes
    await queryInterface.addIndex('programs', ['institution_id']);
    await queryInterface.addIndex('programs', ['status']);
    await queryInterface.addIndex('programs', ['deadline']);
    await queryInterface.addIndex('programs', ['type']);
    await queryInterface.addIndex('programs', ['area']);
    await queryInterface.addIndex('programs', ['level']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('programs');
  },
};
