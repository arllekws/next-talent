'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('saved_programs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      programId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'program_id',
        references: {
          model: 'programs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // Add unique constraint
    await queryInterface.addConstraint('saved_programs', {
      fields: ['user_id', 'program_id'],
      type: 'unique',
      name: 'unique_user_program_saved',
    });

    // Add indexes
    await queryInterface.addIndex('saved_programs', ['user_id']);
    await queryInterface.addIndex('saved_programs', ['program_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('saved_programs');
  },
};
