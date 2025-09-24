import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>¡Hola! 👋</Text>
        <Text style={styles.title}>Bienvenido a tu Coach de Nutrición</Text>
        
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.nutritionIcon]}>
              <View style={styles.appleIcon}>
                <View style={styles.appleBody} />
                <View style={styles.appleLeaf} />
              </View>
            </View>
            <Text style={styles.cardTitle}>Planes de Comida</Text>
            <Text style={styles.cardDescription}>Descubre recetas saludables</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.progressIcon]}>
              <View style={styles.chartBars}>
                <View style={[styles.bar, styles.bar1]} />
                <View style={[styles.bar, styles.bar2]} />
                <View style={[styles.bar, styles.bar3]} />
                <View style={[styles.bar, styles.bar4]} />
              </View>
            </View>
            <Text style={styles.cardTitle}>Progreso</Text>
            <Text style={styles.cardDescription}>Sigue tu evolución</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.workoutIcon]}>
              <View style={styles.dumbbellIcon}>
                <View style={styles.dumbbellWeight1} />
                <View style={styles.dumbbellBar} />
                <View style={styles.dumbbellWeight2} />
              </View>
            </View>
            <Text style={styles.cardTitle}>Entrenamientos</Text>
            <Text style={styles.cardDescription}>Rutinas personalizadas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, styles.profileIcon]}>
              <View style={styles.userIcon}>
                <View style={styles.userHead} />
                <View style={styles.userBody} />
              </View>
            </View>
            <Text style={styles.cardTitle}>Perfil</Text>
            <Text style={styles.cardDescription}>Configuración personal</Text>
          </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    color: '#10B981',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 30,
    lineHeight: 36,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.5)', // Fondo glass sutil
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)', // Transparencia para efecto glass
    width: '48%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Borde más visible
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12, // Para Android - sombra más pronunciada
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#94A3B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  // Contenedor base para iconos
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Colores de fondo para cada icono con más opacidad para contrastar con glass
  nutritionIcon: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressIcon: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  workoutIcon: {
    backgroundColor: '#F87171',
    shadowColor: '#F87171',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  profileIcon: {
    backgroundColor: '#FBBF24',
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  // Icono de manzana (nutrición)
  appleIcon: {
    position: 'relative',
    alignItems: 'center',
  },
  appleBody: {
    width: 20,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  appleLeaf: {
    position: 'absolute',
    top: -2,
    right: 6,
    width: 8,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  // Icono de gráfico de barras (progreso)
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  bar1: {
    height: 12,
  },
  bar2: {
    height: 20,
  },
  bar3: {
    height: 16,
  },
  bar4: {
    height: 24,
  },
  // Icono de mancuerna (entrenamientos)
  dumbbellIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dumbbellWeight1: {
    width: 8,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  dumbbellBar: {
    width: 16,
    height: 4,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  dumbbellWeight2: {
    width: 8,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  // Icono de usuario (perfil)
  userIcon: {
    alignItems: 'center',
  },
  userHead: {
    width: 14,
    height: 14,
    backgroundColor: 'white',
    borderRadius: 7,
    marginBottom: 2,
  },
  userBody: {
    width: 20,
    height: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
