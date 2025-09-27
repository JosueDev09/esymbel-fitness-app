import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const profileData = {
    name: 'Josue Flores',
    age: 26,
    weight: '94 kg',
    height: '1.78 m',
    goal: 'Déficit calórico',
  };

  const achievements = [
    { icon: '🏆', title: 'Primera semana', description: 'Completaste tu primera semana' },
    { icon: '🔥', title: 'Racha de 5 días', description: '5 días consecutivos entrenando' },
    { icon: '💪', title: 'Objetivo alcanzado', description: 'Meta mensual completada' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('userEmail');
              
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Hubo un problema al cerrar sesión');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mi Perfil 👤</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JF</Text>
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.goal}>{profileData.goal}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Edad</Text>
            <Text style={styles.statValue}>{profileData.age} años</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Peso</Text>
            <Text style={styles.statValue}>{profileData.weight}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Altura</Text>
            <Text style={styles.statValue}>{profileData.height}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>IMC</Text>
            <Text style={styles.statValue}>23.0</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Logros Recientes</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>⚙️ Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>📊 Estadísticas Detalladas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>🎯 Cambiar Objetivos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>📱 Compartir Progreso</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#1E293B',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
  },
  goal: {
    fontSize: 16,
    color: '#10B981',
    fontFamily: 'Inter_400Regular',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    backgroundColor: '#1E293B',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
  },
  achievementsContainer: {
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 100, // Espacio para evitar que se empalme con el menú
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
