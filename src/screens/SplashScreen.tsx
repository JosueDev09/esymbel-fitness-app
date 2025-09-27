import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }: any) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // FORZAR limpieza completa del AsyncStorage
        console.log('Clearing AsyncStorage...');
        await AsyncStorage.multiRemove(['hasSeenOnboarding', 'isLoggedIn', 'userEmail']);
        console.log('AsyncStorage cleared successfully');

        // Verificar que efectivamente se limpió
        const allKeys = await AsyncStorage.getAllKeys();
        console.log('Remaining keys:', allKeys);

        // Animación
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();

        // Esperar 3 segundos y luego navegar
        setTimeout(async () => {
          const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
          const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
          
          console.log('After timeout - hasSeenOnboarding:', hasSeenOnboarding);
          console.log('After timeout - isLoggedIn:', isLoggedIn);
          
          // Como limpiamos el storage, siempre debería ir a Onboarding
          console.log('Navigating to OnboardingScreen...');
          navigation.replace('OnboardingScreen');
        }, 3000);

      } catch (error) {
        console.error('Error in SplashScreen:', error);
        Alert.alert('Error', 'Error initializing app');
        // En caso de error, ir a Onboarding
        navigation.replace('OnboardingScreen');
      }
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍎</Text>
        </View>
        <Text style={styles.title}>Esymbel Fitness</Text>
        <Text style={styles.subtitle}>Tu compañero nutricional</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 50,
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 14,
  },
});