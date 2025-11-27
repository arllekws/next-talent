import { fetchUserProfile, fetchDashboard, fetchSavedPrograms } from './api';
import { Program } from '../types';

/**
 * Busca o perfil do usuário do backend
 */
export const fetchUser = async (token: string) => {
  try {
    const userData = await fetchUserProfile(token);
    return {
      name: userData.name || userData.email?.split('@')[0] || 'Usuário',
      email: userData.email,
      avatar: userData.avatar || userData.photoURL || '',
    };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

/**
 * Busca as estatísticas do dashboard do backend
 */
export const fetchStats = async (token: string) => {
  try {
    const dashboardData = await fetchDashboard(token);
    const stats = dashboardData.stats || {};
    
    return [
      { 
        label: 'Programas Inscritos', 
        value: stats.programsEnrolled || 0, 
        icon: 'FaBriefcase', 
        color: 'teal' 
      },
      { 
        label: 'Salvos', 
        value: stats.savedPrograms || 0, 
        icon: 'FaBookmark', 
        color: 'blue' 
      },
      { 
        label: 'Eventos Participados', 
        value: stats.eventsParticipated || 0, 
        icon: 'FaCalendarAlt', 
        color: 'purple' 
      },
      { 
        label: 'Taxa de Sucesso', 
        value: stats.successRate || '0%', 
        icon: 'FaChartLine', 
        color: 'green' 
      },
    ];
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};

/**
 * Busca os programas salvos do backend
 */
export const fetchSavedProgramsList = async (token: string): Promise<Program[]> => {
  try {
    return await fetchSavedPrograms(token);
  } catch (error) {
    console.error('Erro ao buscar programas salvos:', error);
    throw error;
  }
};