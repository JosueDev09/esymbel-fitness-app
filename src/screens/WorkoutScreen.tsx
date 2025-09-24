import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WorkoutScreen() {
  const workouts = [
    {
      id: 1,
      name: 'Cardio Intenso',
      duration: '30 min',
      difficulty: 'Alto',
      exercises: 8,
      calories: 350,
    },
    {
      id: 2,
      name: 'Fuerza Superior',
      duration: '45 min',
      difficulty: 'Medio',
      exercises: 12,
      calories: 280,
    },
    {
      id: 3,
      name: 'Yoga Relajante',
      duration: '60 min',
      difficulty: 'Bajo',
      exercises: 15,
      calories: 180,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Alto': return '#F87171';
      case 'Medio': return '#FBBF24';
      case 'Bajo': return '#10B981';
      default: return '#94A3B8';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Entrenamientos 🏋️‍♀️</Text>
        <Text style={styles.subtitle}>Rutinas personalizadas para ti</Text>
        
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progreso Semanal</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>4</Text>
              <Text style={styles.progressLabel}>Entrenamientos</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>1,240</Text>
              <Text style={styles.progressLabel}>Calorías</Text>
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressNumber}>180</Text>
              <Text style={styles.progressLabel}>Minutos</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rutinas Recomendadas</Text>
        
        <View style={styles.workoutsContainer}>
          {workouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) }]}>
                  <Text style={styles.difficultyText}>{workout.difficulty}</Text>
                </View>
              </View>
              
              <View style={styles.workoutStats}>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatLabel}>Duración</Text>
                  <Text style={styles.workoutStatValue}>{workout.duration}</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatLabel}>Ejercicios</Text>
                  <Text style={styles.workoutStatValue}>{workout.exercises}</Text>
                </View>
                <View style={styles.workoutStat}>
                  <Text style={styles.workoutStatLabel}>Calorías</Text>
                  <Text style={styles.workoutStatValue}>{workout.calories}</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Comenzar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    color: '#3B82F6',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
  },
  workoutsContainer: {
    gap: 16,
  },
  workoutCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  workoutStat: {
    alignItems: 'center',
  },
  workoutStatLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  workoutStatValue: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});
