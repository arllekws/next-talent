import { Program } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// ========== PROGRAMS (público) ==========

export async function fetchPrograms(filters?: {
  area?: string;
  type?: string;
  level?: string;
  status?: string;
  tags?: string;
  page?: number;
  limit?: number;
}): Promise<Program[]> {
  console.log('🔄 Buscando programas do backend...');
  
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${API_BASE_URL}/programs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log('📡 URL:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Programas recebidos:', data);

    // Normaliza a resposta do backend para o formato esperado pelo frontend
    const programs = (data.data || data).map((program: any) => ({
      id: program.id,
      title: program.title,
      companyName: program.institution?.name || 'Sem instituição',
      type: program.type,
      deadline: program.deadline,
      participants: program.participants,
      status: program.status,
      description: program.description,
      tags: program.tags || [],
      area: program.area,
      level: program.level,
    }));

    return programs;
  } catch (error) {
    console.error('❌ Erro ao buscar programas:', error);
    throw error;
  }
}

export async function fetchProgramById(id: string): Promise<Program | null> {
  console.log(`🔄 Buscando programa ${id} do backend...`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const program = await response.json();
    console.log('✅ Programa recebido:', program);

    return {
      id: program.id,
      title: program.title,
      companyName: program.institution?.name || 'Sem instituição',
      type: program.type,
      deadline: program.deadline,
      participants: program.participants,
      status: program.status,
      description: program.description,
      tags: program.tags || [],
      area: program.area,
      level: program.level,
    };
  } catch (error) {
    console.error(`❌ Erro ao buscar programa ${id}:`, error);
    throw error;
  }
}

// ========== INSTITUTIONS (público) ==========

export async function fetchInstitutions() {
  try {
    const response = await fetch(`${API_BASE_URL}/institutions`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao buscar instituições:', error);
    throw error;
  }
}

// ========== USER (protegido) ==========

export async function fetchUserProfile(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao buscar perfil do usuário:', error);
    throw error;
  }
}

export async function updateUserProfile(token: string, data: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil do usuário:', error);
    throw error;
  }
}

// ========== SAVED PROGRAMS (protegido) ==========

export async function fetchSavedPrograms(token: string): Promise<Program[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-programs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Normaliza a resposta do backend
    const programs = (data.data || data).map((item: any) => ({
      id: item.program?.id || item.id,
      title: item.program?.title || item.title,
      companyName: item.program?.institution?.name || item.institution?.name || 'Sem instituição',
      type: item.program?.type || item.type,
      deadline: item.program?.deadline || item.deadline,
      participants: item.program?.participants || item.participants,
      status: item.program?.status || item.status,
      description: item.program?.description || item.description,
      tags: item.program?.tags || item.tags || [],
      area: item.program?.area || item.area,
      level: item.program?.level || item.level,
    }));
    
    return programs;
  } catch (error) {
    console.error('❌ Erro ao buscar programas salvos:', error);
    throw error;
  }
}

export async function saveProgram(programId: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-programs/${programId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao salvar programa:', error);
    throw error;
  }
}

export async function unsaveProgram(programId: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-programs/${programId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao remover programa salvo:', error);
    throw error;
  }
}

// ========== APPLICATIONS (protegido) ==========

export async function fetchApplications(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao buscar inscrições:', error);
    throw error;
  }
}

export async function createApplication(programId: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ programId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao criar inscrição:', error);
    throw error;
  }
}

// ========== DASHBOARD (protegido) ==========

export async function fetchDashboard(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('❌ Erro ao buscar dashboard:', error);
    throw error;
  }
}
