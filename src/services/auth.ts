// src/services/auth.ts
import api from './api';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/Login/authenticate', {
      username: email,
      password: password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error en login:', error);
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};
