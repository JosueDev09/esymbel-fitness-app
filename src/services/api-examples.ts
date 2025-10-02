// EJEMPLOS DE FETCH PARA OTRAS PANTALLAS
// =====================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_CONFIG, ENDPOINTS } from '../config/backend';

// Función helper para hacer peticiones autenticadas
const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('authToken');
  
  return fetch(`${BACKEND_CONFIG.ACTIVE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });
};

// EJEMPLO 1: Obtener perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await authenticatedFetch(ENDPOINTS.PROFILE);
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error obteniendo perfil');
    }
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

// EJEMPLO 2: Actualizar perfil del usuario
export const updateUserProfile = async (profileData: any) => {
  try {
    const response = await authenticatedFetch('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error actualizando perfil');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// EJEMPLO 3: Obtener rutinas de ejercicio
export const getWorkouts = async () => {
  try {
    const response = await authenticatedFetch('/workouts');
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error obteniendo rutinas');
    }
  } catch (error) {
    console.error('Error getting workouts:', error);
    throw error;
  }
};

// EJEMPLO 4: Crear nueva rutina
export const createWorkout = async (workoutData: any) => {
  try {
    const response = await authenticatedFetch('/workouts', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error creando rutina');
    }
  } catch (error) {
    console.error('Error creating workout:', error);
    throw error;
  }
};

// EJEMPLO 5: Subir imagen de perfil
export const uploadProfileImage = async (imageUri: string) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);
    
    const response = await fetch(`${BACKEND_CONFIG.ACTIVE_URL}/users/upload-avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // No incluir Content-Type para FormData
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Error subiendo imagen');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// EJEMPLO 6: Registro de usuario
export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const response = await fetch(`${BACKEND_CONFIG.ACTIVE_URL}${ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Guardar datos igual que en login
      await AsyncStorage.multiSet([
        ['isLoggedIn', 'true'],
        ['userEmail', data.user?.email || userData.email],
        ['authToken', data.access_token || ''],
        ['userData', JSON.stringify(data.user || {})],
      ]);
      
      return data;
    } else {
      throw new Error(data.message || 'Error en registro');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// EJEMPLO DE USO EN UNA PANTALLA:
/*

import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { getUserProfile, getWorkouts } from '../services/api-examples';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar perfil y rutinas en paralelo
      const [profileData, workoutsData] = await Promise.all([
        getUserProfile(),
        getWorkouts()
      ]);
      
      setUser(profileData);
      setWorkouts(workoutsData);
      
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Text>Hola, {user?.firstName}!</Text>
      <Text>Tienes {workouts.length} rutinas</Text>
    </View>
  );
}

*/
