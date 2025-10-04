import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Semanal');

  // Datos de ejemplo para los macronutrientes
  const macroData = {
    proteins: { current: 840, target: 1050, percentage: 80 },
    carbs: { current: 910, target: 1400, percentage: 65 },
    fats: { current: 210, target: 420, percentage: 50 },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Panel de Control</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.streakCard}>
            <View style={styles.streakContent}>
              <MaterialIcons name="local-fire-department" size={32} color="#38e07b" />
              <Text style={styles.streakText}>Racha de 5 Días</Text>
            </View>
            <Text style={styles.streakSubtext}>¡Sigue así para alcanzar tu meta!</Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sophia</Text>
            <Text style={styles.userType}>Premium Member</Text>
          </View>
        </View>
        
        {/* Weekly Goals Section */}
        <View style={styles.weeklyGoalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Metas Semanales</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity 
                style={[styles.periodButton, selectedPeriod !== 'Semanal' && styles.periodButtonInactive]}
                onPress={() => setSelectedPeriod('Diario')}
              >
                <Text style={[styles.periodButtonText, selectedPeriod !== 'Semanal' && styles.periodButtonTextInactive]}>
                  Diario
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.periodButton, selectedPeriod === 'Semanal' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('Semanal')}
              >
                <Text style={[styles.periodButtonText, selectedPeriod === 'Semanal' && styles.periodButtonTextActive]}>
                  Semanal
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.macroGrid}>
            {/* Proteínas */}
            <View style={styles.macroCard}>
              <View style={styles.progressCircle}>
                <AnimatedCircularProgress
                  size={96}
                  width={10}
                  fill={macroData.proteins.percentage}
                  tintColor="#38e07b"
                  backgroundColor="rgba(56, 224, 123, 0.2)"
                  lineCap="round"
                  duration={1000}
                >
                  {() => (
                    <Text style={styles.progressPercentageText}>
                      {macroData.proteins.percentage}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Text style={styles.macroLabel}>Proteínas</Text>
              <Text style={styles.macroValues}>
                {macroData.proteins.current}/{macroData.proteins.target}g
              </Text>
            </View>

            {/* Carbohidratos */}
            <View style={styles.macroCard}>
              <View style={styles.progressCircle}>
                <AnimatedCircularProgress
                  size={96}
                  width={10}
                  fill={macroData.carbs.percentage}
                  tintColor="#38e07b"
                  backgroundColor="rgba(56, 224, 123, 0.2)"
                  lineCap="round"
                  duration={1000}
                >
                  {() => (
                    <Text style={styles.progressPercentageText}>
                      {macroData.carbs.percentage}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroValues}>
                {macroData.carbs.current}/{macroData.carbs.target}g
              </Text>
            </View>

            {/* Grasas */}
            <View style={styles.macroCard}>
              <View style={styles.progressCircle}>
                <AnimatedCircularProgress
                  size={96}
                  width={10}
                  fill={macroData.fats.percentage}
                  tintColor="#38e07b"
                  backgroundColor="rgba(56, 224, 123, 0.2)"
                  lineCap="round"
                  duration={1000}
                >
                  {() => (
                    <Text style={styles.progressPercentageText}>
                      {macroData.fats.percentage}%
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <Text style={styles.macroLabel}>Grasas</Text>
              <Text style={styles.macroValues}>
                {macroData.fats.current}/{macroData.fats.target}g
              </Text>
            </View>
          </View>

          <Text style={styles.macroSubtext}>
            Tu ingesta semanal de macros es clave para la ganancia muscular.
          </Text>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          
          {/* Activity Items */}
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <MaterialIcons name="fitness-center" size={24} color="#38e07b" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Último entrenamiento</Text>
                <Text style={styles.activityDescription}>Rutina de Pecho y Tríceps</Text>
              </View>
              <Text style={styles.activityTime}>Hace 2h</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <MaterialIcons name="restaurant" size={24} color="#38e07b" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Última comida</Text>
                <Text style={styles.activityDescription}>Ensalada de Pollo y Quinoa</Text>
              </View>
              <Text style={styles.activityTime}>Hace 4h</Text>
            </View>
          </View>

          {/* Weekly Progress Chart */}
          <View style={styles.progressChart}>
            <Text style={styles.chartTitle}>Progreso Semanal</Text>
            <View style={styles.chartContainer}>
              <Image 
                source={{ 
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1tTjOUGWaAWBDw7kfGKBQdxOn66oeR6gPu-mVmmNnMni-xqohePYUoZ4OarZuIZAzjp3Pe7yerCQdxaEX4c6IS4fi4asZA1XyRxbWVOCXQ7E8N-lpn9pUGdXhpAyroDEAIzTYo79xpJQ-QFbElyIZN61JDDP-UMLhbzQhQEVWueeR5iRcTz3COXXMt4EuCW-JDVNxgZT7uK4zIo0rJE5hoVXvYQ-EPuzPnhvSvy3_8xhOj3-lcNcLPov5aSvEbwt4MDfViIhfmzIg'
                }}
                style={styles.chartImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122017', // background-dark
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerSpacer: {
    width: 48,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  
  // ScrollView
  scrollView: {
    flex: 1,
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  streakCard: {
    backgroundColor: 'rgba(56, 224, 123, 0.2)', // primary/20
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  streakSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userType: {
    fontSize: 16,
    color: '#38e07b', // primary
  },
  
  // Weekly Goals Section
  weeklyGoalsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(56, 224, 123, 0.2)',
    borderRadius: 24,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  periodButtonActive: {
    backgroundColor: '#38e07b',
  },
  periodButtonInactive: {
    backgroundColor: 'transparent',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#122017',
  },
  periodButtonTextInactive: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  
  // Macro Grid
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  macroCard: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  progressCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  macroValues: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  macroSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: 16,
  },
  
  // Activity Section
  activitySection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 224, 123, 0.2)',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(56, 224, 123, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activityTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#38e07b',
  },
  
  // Progress Chart
  progressChart: {
    backgroundColor: 'rgba(56, 224, 123, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  chartContainer: {
    height: 160,
    borderRadius: 8,
    backgroundColor: 'rgba(56, 224, 123, 0.3)',
    overflow: 'hidden',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
});
