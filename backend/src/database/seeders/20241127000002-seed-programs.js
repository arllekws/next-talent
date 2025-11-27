'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get institutions to reference
    const institutions = await queryInterface.sequelize.query(
      'SELECT id, name FROM institutions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const institutionMap = {};
    institutions.forEach((inst) => {
      institutionMap[inst.name] = inst.id;
    });

    const programs = [
      {
        id: uuidv4(),
        institution_id: institutionMap['DIO'],
        title: 'Oportunidade DevOps',
        type: 'Curso',
        deadline: '2025-11-15',
        description:
          'Aprenda práticas de CI/CD, containers e automação de infraestrutura com especialistas.',
        participants: 234,
        status: 'open',
        tags: JSON.stringify(['devops']),
        area: 'DevOps',
        level: 'Pleno',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['TechAcademy'],
        title: 'Bootcamp Full Stack',
        type: 'Bootcamp',
        deadline: '2025-10-20',
        description:
          'Formação intensiva para desenvolver aplicações completas com React e Node.js.',
        participants: 412,
        status: 'open',
        tags: JSON.stringify(['frontend', 'backend']),
        area: 'Full Stack',
        level: 'Sênior',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['NexTalent'],
        title: 'Mentoria de Carreira em TI',
        type: 'Mentoria',
        deadline: '2025-12-28',
        description:
          'Acompanhe profissionais experientes e trace seu plano de crescimento na área de tecnologia.',
        participants: 92,
        status: 'closing-soon',
        tags: JSON.stringify([]),
        area: 'Pesquisa',
        level: 'Júnior',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['Cesar Labs'],
        title: 'Desafio Front-End React',
        type: 'Desafio Técnico',
        deadline: '2025-11-05',
        description:
          'Construa uma aplicação moderna com React e Chakra UI para resolver um problema real.',
        participants: 189,
        status: 'open',
        tags: JSON.stringify(['frontend']),
        area: 'Tecnologia',
        level: 'Pleno',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['Alura'],
        title: 'Formação em Data Science',
        type: 'Curso',
        deadline: '2025-11-30',
        description:
          'Aprenda Python, estatística e machine learning com especialistas do mercado.',
        participants: 850,
        status: 'open',
        tags: JSON.stringify(['dados']),
        area: 'Tecnologia',
        level: 'Sênior',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['DIO'],
        title: 'Bootcamp Backend com Node.js',
        type: 'Bootcamp',
        deadline: '2025-12-15',
        description:
          'Aprenda a construir APIs RESTful escaláveis com Node.js, Express e PostgreSQL.',
        participants: 320,
        status: 'open',
        tags: JSON.stringify(['backend']),
        area: 'Backend',
        level: 'Pleno',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['Alura'],
        title: 'Curso de UX/UI Design',
        type: 'Curso',
        deadline: '2025-11-20',
        description:
          'Domine os fundamentos de design de interfaces e experiência do usuário.',
        participants: 156,
        status: 'open',
        tags: JSON.stringify(['frontend']),
        area: 'Design',
        level: 'Júnior',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['TechAcademy'],
        title: 'Programa de Estágio em Desenvolvimento',
        type: 'Estágio',
        deadline: '2025-10-30',
        description:
          'Oportunidade de estágio para desenvolvedores iniciantes em projetos reais.',
        participants: 78,
        status: 'closing-soon',
        tags: JSON.stringify(['frontend', 'backend']),
        area: 'Full Stack',
        level: 'Júnior',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['Cesar Labs'],
        title: 'Hackathon de Inovação 2025',
        type: 'Hackathon',
        deadline: '2025-11-10',
        description:
          'Participe de 48 horas de desenvolvimento intensivo e concorra a prêmios.',
        participants: 245,
        status: 'open',
        tags: JSON.stringify(['frontend', 'backend', 'dados']),
        area: 'Tecnologia',
        level: 'Pleno',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        institution_id: institutionMap['NexTalent'],
        title: 'Workshop de Cloud Computing',
        type: 'Workshop',
        deadline: '2025-12-05',
        description:
          'Aprenda sobre AWS, Azure e Google Cloud em um workshop prático de 3 dias.',
        participants: 112,
        status: 'open',
        tags: JSON.stringify(['devops']),
        area: 'Cloud',
        level: 'Sênior',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('programs', programs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('programs', null, {});
  },
};
