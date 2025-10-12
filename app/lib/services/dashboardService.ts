const MOCK_USER = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  avatar: '',
};

const MOCK_STATS = [
  { label: 'Programas Inscritos', value: 8, icon: 'FaBriefcase', color: 'teal' },
  { label: 'Salvos', value: 12, icon: 'FaBookmark', color: 'blue' },
  { label: 'Eventos Participados', value: 5, icon: 'FaCalendarAlt', color: 'purple' },
  { label: 'Taxa de Sucesso', value: '75%', icon: 'FaChartLine', color: 'green' },
];

const MOCK_SAVED_PROGRAMS = [
  { id: 1, title: 'Programa Trainee Tech 2025', company: 'MegaCorp' },
  { id: 2, title: 'Imersão em Data Science', company: 'DataLab' },
];

export const fetchMockUser = () => new Promise(resolve => setTimeout(() => resolve(MOCK_USER), 500));
export const fetchMockStats = () => new Promise(resolve => setTimeout(() => resolve(MOCK_STATS), 500));
export const fetchMockSavedPrograms = () => new Promise(resolve => setTimeout(() => resolve(MOCK_SAVED_PROGRAMS), 500));