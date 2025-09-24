import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function NutritionScreen() {
  const meals = [
    {
      id: 1,
      name: 'Desayuno Energético',
      calories: 450,
      time: '08:00',
      description: 'Avena con frutas y nueces',
    },
    {
      id: 2,
      name: 'Almuerzo Balanceado',
      calories: 620,
      time: '13:00',
      description: 'Pollo con vegetales y quinoa',
    },
    {
      id: 3,
      name: 'Cena Ligera',
      calories: 380,
      time: '19:00',
      description: 'Salmón con ensalada verde',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Plan Nutricional 🍎</Text>
        <Text style={styles.subtitle}>Comidas recomendadas para hoy</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1,450</Text>
            <Text style={styles.statLabel}>Calorías</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>120g</Text>
            <Text style={styles.statLabel}>Proteína</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>180g</Text>
            <Text style={styles.statLabel}>Carbos</Text>
          </View>
        </View>

        <View style={styles.mealsContainer}>
          {meals.map((meal) => (
            <TouchableOpacity key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealCalories}>{meal.calories} cal</Text>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealDescription}>{meal.description}</Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    color: '#10B981',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
  mealsContainer: {
    gap: 16,
  },
  mealCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTime: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Inter_700Bold',
  },
  mealCalories: {
    fontSize: 14,
    color: '#F87171',
    fontFamily: 'Inter_700Bold',
  },
  mealName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
});
