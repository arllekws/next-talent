'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        id: uuidv4(),
        firebase_uid: 'test-user-1',
        email: 'joao.silva@email.com',
        display_name: 'João Silva',
        photo_url: null,
        interests: JSON.stringify([
          'Desenvolvimento Web',
          'Tecnologia e Inovação',
          'Backend',
        ]),
        preferences: JSON.stringify([
          'Prefere trabalhar remotamente',
          'Gosta de projetos colaborativos',
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        firebase_uid: 'test-user-2',
        email: 'maria.santos@email.com',
        display_name: 'Maria Santos',
        photo_url: null,
        interests: JSON.stringify([
          'UI/UX Design',
          'Frontend',
          'Inteligência Artificial',
        ]),
        preferences: JSON.stringify([
          'Aprende melhor com aulas práticas',
          'Gosta de trabalhar em equipe',
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        firebase_uid: 'test-user-3',
        email: 'pedro.oliveira@email.com',
        display_name: 'Pedro Oliveira',
        photo_url: null,
        interests: JSON.stringify(['DevOps', 'Cloud Computing', 'Backend']),
        preferences: JSON.stringify([
          'Prefere desafios técnicos',
          'Busca crescimento profissional',
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
