import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  { id: '1', title: 'Welcome to Esymbel Fitness', description: 'Your journey to a healthier life starts here.' },
  { id: '2', title: 'Track Your Progress', description: 'Monitor your meals and macros easily.' },
  { id: '3', title: 'Achieve Your Goals', description: 'Stay consistent and celebrate your achievements.' },
];

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Inter_400Regular,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Marcar onboarding como completado y navegar al login
      markOnboardingComplete();
    }
  };

  const markOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.replace('LoginScreen'); // Cambio aquí
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e:any) => {
          const slideIndex = Math.round(e.nativeEvent.contentOffset.x / Dimensions.get('window').width);
          setCurrentSlide(slideIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
  },
  slide: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#10B981',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
  },
});