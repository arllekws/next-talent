'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const institutions = [
      {
        id: uuidv4(),
        name: 'DIO',
        logo: 'https://www.dio.me/assets/images/logo.png',
        description:
          'Digital Innovation One é uma plataforma de educação em tecnologia que oferece cursos, bootcamps e desafios.',
        website: 'https://www.dio.me',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'TechAcademy',
        logo: null,
        description:
          'Academia de tecnologia focada em formação intensiva de desenvolvedores full stack.',
        website: 'https://www.techacademy.com.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'NexTalent',
        logo: null,
        description:
          'Plataforma de mentoria e desenvolvimento de carreira em tecnologia.',
        website: 'https://www.nextalent.com.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Cesar Labs',
        logo: null,
        description:
          'Centro de inovação e tecnologia que promove desafios e programas de formação.',
        website: 'https://www.cesar.org.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Alura',
        logo: 'https://www.alura.com.br/assets/img/alura-logo.svg',
        description:
          'Escola online de tecnologia com mais de 1.500 cursos de programação, design, data science e muito mais.',
        website: 'https://www.alura.com.br',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('institutions', institutions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
