import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function HomeScreen() {
  // Estado para rastrear comidas completadas
  const [completedMeals, setCompletedMeals] = useState({
    breakfast: false,
    lunch: false,
    snack: false,
    dinner: false,
  });

  // Estado para el progreso semanal
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  // Estado para macronutrientes diarios y semanales
  const [dailyMacros, setDailyMacros] = useState({
    proteins: 0,
    carbs: 0,
    fats: 0,
  });
  const [weeklyMacros, setWeeklyMacros] = useState({
    proteins: 0,
    carbs: 0,
    fats: 0,
  });

  // Estado para la celebración
  const [showCelebration, setShowCelebration] = useState(false);
  const [wasCompleted, setWasCompleted] = useState(false);
  const confettiRef = useRef<any>(null);

  // Estado para el mensaje motivacional
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [currentMotivationalMessage, setCurrentMotivationalMessage] = useState('');

  // Frases motivacionales
  const motivationalMessages = [
    "💪 ¡Cada comida es un paso hacia tu mejor versión!",
    "🔥 Tu disciplina de hoy es tu fortaleza de mañana",
    "🌟 No es solo alimentarse, es nutrir tus sueños",
    "⚡ Cada día es una nueva oportunidad para brillar",
    "🏆 Tu consistencia es tu superpoder secreto",
    "🚀 Pequeños pasos, grandes transformaciones",
    "💎 Eres más fuerte de lo que crees",
    "🌈 Tu salud es tu mayor inversión",
    "⭐ Hoy es el día perfecto para ser imparable",
    "🎯 Enfócate en el progreso, no en la perfección",
    "🔋 Tu energía de hoy construye tu futuro",
    "🌱 Cada elección saludable te hace crecer"
  ];

  // Función para calcular el progreso diario
  const getDailyProgress = () => {
    const completed = Object.values(completedMeals).filter(Boolean).length;
    return (completed / 4) * 100; // 4 comidas por día
  };

  // Valores nutricionales por comida (en gramos)
  const mealMacros = {
    breakfast: { proteins: 15, carbs: 45, fats: 8 }, // Avena con Frutos Rojos
    lunch: { proteins: 42, carbs: 38, fats: 22 },    // Salmón con Quinoa
    snack: { proteins: 20, carbs: 12, fats: 12 },    // Yogur Griego
    dinner: { proteins: 45, carbs: 35, fats: 18 },   // Pollo al Horno
  };

  // Metas diarias de macronutrientes
  const dailyMacroTargets = {
    proteins: 122, // 15+42+20+45
    carbs: 130,    // 45+38+12+35
    fats: 60,      // 8+22+12+18
  };

  // Función para calcular macronutrientes del día
  const calculateDailyMacros = () => {
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    Object.entries(completedMeals).forEach(([meal, completed]) => {
      if (completed) {
        const macros = mealMacros[meal as keyof typeof mealMacros];
        totalProteins += macros.proteins;
        totalCarbs += macros.carbs;
        totalFats += macros.fats;
      }
    });

    return {
      proteins: (totalProteins / dailyMacroTargets.proteins) * 100,
      carbs: (totalCarbs / dailyMacroTargets.carbs) * 100,
      fats: (totalFats / dailyMacroTargets.fats) * 100,
    };
  };

  // Función para mostrar la celebración
  const showCelebrationModal = () => {
    setShowCelebration(true);
    if (confettiRef.current) {
      confettiRef.current.start();
    }
    
    // Ocultar celebración después de 4 segundos
    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  // Función para mostrar mensaje motivacional
  const showMotivationalMessageModal = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMotivationalMessage(randomMessage);
    setShowMotivationalMessage(true);
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      setShowMotivationalMessage(false);
    }, 5000);
  };

  // Función para actualizar el progreso semanal
  const updateWeeklyProgress = async () => {
    try {
      const today = new Date();
      const currentDay = today.getDay(); // 0 = domingo, 1 = lunes, etc.
      
      // Calcular el inicio de la semana (lunes)
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
      const weekKey = weekStart.toDateString();
      
      // Actualizar progreso general
      const weeklyData = await AsyncStorage.getItem(`weekly_${weekKey}`);
      let weekData = weeklyData ? JSON.parse(weeklyData) : {};
      
      const todayKey = new Date().toDateString();
      const currentDailyProgress = getDailyProgress();
      const currentDailyMacros = calculateDailyMacros();
      
      weekData[todayKey] = {
        progress: currentDailyProgress,
        macros: currentDailyMacros
      };
      
      await AsyncStorage.setItem(`weekly_${weekKey}`, JSON.stringify(weekData));
      
      // Calcular promedios semanales
      const dailyProgresses = Object.values(weekData).map((day: any) => day.progress || 0);
      const averageProgress = dailyProgresses.length > 0 
        ? dailyProgresses.reduce((sum, progress) => sum + progress, 0) / dailyProgresses.length
        : 0;
      
      // Calcular promedios de macronutrientes semanales
      const dailyMacrosArray = Object.values(weekData).map((day: any) => day.macros || { proteins: 0, carbs: 0, fats: 0 });
      const averageMacros = {
        proteins: dailyMacrosArray.reduce((sum, macros: any) => sum + macros.proteins, 0) / dailyMacrosArray.length,
        carbs: dailyMacrosArray.reduce((sum, macros: any) => sum + macros.carbs, 0) / dailyMacrosArray.length,
        fats: dailyMacrosArray.reduce((sum, macros: any) => sum + macros.fats, 0) / dailyMacrosArray.length,
      };
      
      setWeeklyProgress(averageProgress);
      setWeeklyMacros(averageMacros);
      
      // Actualizar macros diarios
      setDailyMacros(currentDailyMacros);
      
    } catch (error) {
      console.error('Error updating weekly progress:', error);
    }
  };

  // Función para completar una comida
  const completeMeal = async (mealType: keyof typeof completedMeals) => {
    const updatedMeals = {
      ...completedMeals,
      [mealType]: true
    };
    
    // Verificar si se completó el 100% del día
    const completedCount = Object.values(updatedMeals).filter(Boolean).length;
    const isFullyCompleted = completedCount === 4;
    const wasAlreadyCompleted = Object.values(completedMeals).filter(Boolean).length === 4;
    
    setCompletedMeals(updatedMeals);
    
    try {
      await AsyncStorage.setItem('completedMeals', JSON.stringify(updatedMeals));
      // Actualizar progreso semanal después de completar una comida
      setTimeout(() => updateWeeklyProgress(), 100);
      
      // Mostrar celebración si se alcanzó el 100% y no estaba completo antes
      if (isFullyCompleted && !wasAlreadyCompleted) {
        setTimeout(() => showCelebrationModal(), 500); // Pequeño delay para que se vea la animación del progress bar
      }
    } catch (error) {
      console.error('Error saving meal status:', error);
    }
  };

  // Función para verificar si es un nuevo día (resetear completados)
  useEffect(() => {
    const checkNewDay = async () => {
      try {
        const today = new Date().toDateString();
        const lastCheck = await AsyncStorage.getItem('lastMealCheck');
        const savedMeals = await AsyncStorage.getItem('completedMeals');
        
        if (lastCheck !== today) {
          // Es un nuevo día, resetear todo
          const resetMeals = {
            breakfast: false,
            lunch: false,
            snack: false,
            dinner: false,
          };
          setCompletedMeals(resetMeals);
          await AsyncStorage.setItem('lastMealCheck', today);
          await AsyncStorage.setItem('completedMeals', JSON.stringify(resetMeals));
        } else if (savedMeals) {
          // Mismo día, restaurar estado guardado
          setCompletedMeals(JSON.parse(savedMeals));
        }
        
        // Cargar progreso semanal
        updateWeeklyProgress();
        
        // Mostrar mensaje motivacional después de un pequeño delay
        setTimeout(() => {
          showMotivationalMessageModal();
        }, 1000);
      } catch (error) {
        console.error('Error checking meal status:', error);
      }
    };

    checkNewDay();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>¡Hola! 👋</Text>
        <Text style={styles.title}>Bienvenido a tu Coach de Nutrición</Text>
        
        {/* Sección de Progress Bars */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Tu Progreso 📊</Text>
          
          <View style={styles.progressContainer}>
            {/* Progress Bar Diario */}
            <View style={styles.progressCard}>
              <Text style={styles.progressLabel}>Progreso Diario</Text>
              <View style={styles.circularProgressContainer}>
                <AnimatedCircularProgress
                  size={120}
                  width={8}
                  fill={getDailyProgress()}
                  tintColor="#10B981"
                  backgroundColor="rgba(16, 185, 129, 0.2)"
                  lineCap="round"
                  duration={1000}
                >
                  {() => (
                    <View style={styles.progressContent}>
                      <Text style={styles.progressValue}>{Math.round(getDailyProgress())}%</Text>
                      <Text style={styles.progressSubtext}>
                        {Object.values(completedMeals).filter(Boolean).length}/4
                      </Text>
                      <Text style={styles.progressSubtext}>comidas</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            

            {/* Progress Bar Semanal */}
            <View style={styles.progressCard}>
              <Text style={styles.progressLabel}>Progreso Semanal</Text>
              <View style={styles.circularProgressContainer}>
                <AnimatedCircularProgress
                  size={120}
                  width={8}
                  fill={weeklyProgress}
                  tintColor="#3B82F6"
                  backgroundColor="rgba(59, 130, 246, 0.2)"
                  lineCap="round"
                  duration={1000}
                >
                  {() => (
                    <View style={styles.progressContent}>
                      <Text style={styles.progressValue}>{Math.round(weeklyProgress)}%</Text>
                      <Text style={styles.progressSubtext}>esta</Text>
                      <Text style={styles.progressSubtext}>semana</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
          </View>
           </View>
         

          {/* Mini Progress Bars de Macronutrientes */}
          <View style={styles.macroProgressSection}>
            <Text style={styles.macroProgressTitle}>Macronutrientes 🥗</Text>
            
            {/* Progress Bars Diarios */}
            <View style={styles.macroProgressContainer}>
              <Text style={styles.macroProgressSubtitle}>Hoy</Text>
              
              <View style={styles.circularMacroRow}>
                <View style={styles.circularMacroItem}>
                  <Text style={styles.macroIcon}>🥩</Text>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(dailyMacros.proteins, 100)}
                    tintColor="#EF4444"
                    backgroundColor="rgba(239, 68, 68, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(dailyMacros.proteins)}%</Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={styles.circularMacroLabel}>Proteínas</Text>
                </View>

                <View style={styles.circularMacroItem}>
                <View style={styles.macroInfo}>
                  <Text style={styles.macroIcon}>�</Text>
                  <Text style={styles.macroLabel}>Carbohidratos</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(dailyMacros.fats, 100)}
                    tintColor="#8B5CF6"
                    backgroundColor="rgba(139, 92, 246, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(dailyMacros.fats)}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>

                <View style={styles.circularMacroItem}>
                  <Text style={styles.macroIcon}>🥑</Text>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(dailyMacros.fats, 100)}
                    tintColor="#8B5CF6"
                    backgroundColor="rgba(139, 92, 246, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(dailyMacros.fats)}%</Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={styles.circularMacroLabel}>Grasas</Text>
                </View>
              </View>
            </View>

            {/* Progress Bars Semanales */}
            <View style={styles.macroProgressContainer}>
              <Text style={styles.macroProgressSubtitle}>📈 Esta Semana</Text>
              
              <View style={styles.circularMacroRow}>
                <View style={styles.circularMacroItem}>
                  <Text style={styles.macroIcon}>🥩</Text>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(weeklyMacros.proteins, 100)}
                    tintColor="#EF4444"
                    backgroundColor="rgba(239, 68, 68, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(weeklyMacros.proteins)}%</Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={styles.circularMacroLabel}>Proteínas</Text>
                </View>

                <View style={styles.circularMacroItem}>
                <View style={styles.macroInfo}>
                  <Text style={styles.macroIcon}>�</Text>
                  <Text style={styles.macroLabel}>Carbohidratos</Text>
                </View>
                 <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(dailyMacros.fats, 100)}
                    tintColor="#8B5CF6"
                    backgroundColor="rgba(139, 92, 246, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(dailyMacros.fats)}%</Text>
                    )}
                  </AnimatedCircularProgress>
              </View>

              {/* Grasas Semanales */}
             <View style={styles.circularMacroItem}>
                  <Text style={styles.macroIcon}>🥑</Text>
                  <AnimatedCircularProgress
                    size={60}
                    width={4}
                    fill={Math.min(dailyMacros.fats, 100)}
                    tintColor="#8B5CF6"
                    backgroundColor="rgba(139, 92, 246, 0.2)"
                    lineCap="round"
                    rotation={0}
                    duration={1000}
                  >
                    {() => (
                      <Text style={styles.circularProgressText}>{Math.round(dailyMacros.fats)}%</Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={styles.circularMacroLabel}>Grasas</Text>
                </View>
            </View>
          </View>
        </View>
        
        {/* Sección de Plan de Comidas del Día */}
        <View style={styles.mealPlanSection}>
          <Text style={styles.mealPlanTitle}>Tu Plan de Hoy 🍽️</Text>
          <Text style={styles.mealPlanSubtitle}>Comidas diseñadas para tus macros</Text>
          
          {/* Desayuno */}
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTimeContainer}>
                <View style={[styles.mealIcon, styles.breakfastIcon]}>
                  <View style={styles.sunIcon}>
                    <View style={styles.sunCenter} />
                    <View style={styles.sunRay1} />
                    <View style={styles.sunRay2} />
                    <View style={styles.sunRay3} />
                    <View style={styles.sunRay4} />
                  </View>
                </View>
                <View>
                  <Text style={styles.mealTime}>Desayuno</Text>
                  <Text style={styles.mealHour}>08:00 AM</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Cambiar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.completeButton, completedMeals.breakfast && styles.completedButton]}
                  onPress={() => completeMeal('breakfast')}
                >
                  <Text style={[styles.completeButtonText, completedMeals.breakfast && styles.completedButtonText]}>
                    {completedMeals.breakfast ? '✓ Completado' : 'Completar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.mealName}>
              {completedMeals.breakfast ? 'Se completaron las calorías del desayuno ✓' : 'Avena con Frutos Rojos'}
            </Text>
            <View style={styles.mealNutrition}>
              <Text style={styles.mealCalories}>420 cal</Text>
              <Text style={styles.mealMacro}>45g carbos • 15g proteína • 8g grasas</Text>
            </View>
          </View>

          {/* Almuerzo */}
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTimeContainer}>
                <View style={[styles.mealIcon, styles.lunchIcon]}>
                  <View style={styles.plateIcon}>
                    <View style={styles.plateBase} />
                    <View style={styles.plateFood1} />
                    <View style={styles.plateFood2} />
                  </View>
                </View>
                <View>
                  <Text style={styles.mealTime}>Almuerzo</Text>
                  <Text style={styles.mealHour}>01:00 PM</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Cambiar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.completeButton, completedMeals.lunch && styles.completedButton]}
                  onPress={() => completeMeal('lunch')}
                >
                  <Text style={[styles.completeButtonText, completedMeals.lunch && styles.completedButtonText]}>
                    {completedMeals.lunch ? '✓ Completado' : 'Completar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.mealName}>
              {completedMeals.lunch ? 'Se completaron las calorías del almuerzo ✓' : 'Salmón con Quinoa y Vegetales'}
            </Text>
            <View style={styles.mealNutrition}>
              <Text style={styles.mealCalories}>650 cal</Text>
              <Text style={styles.mealMacro}>42g proteína • 38g carbos • 22g grasas</Text>
            </View>
          </View>

          {/* Snack */}
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTimeContainer}>
                <View style={[styles.mealIcon, styles.snackIcon]}>
                  <View style={styles.fruitIcon}>
                    <View style={styles.fruitBase} />
                    <View style={styles.fruitLeaf} />
                  </View>
                </View>
                <View>
                  <Text style={styles.mealTime}>Snack</Text>
                  <Text style={styles.mealHour}>04:00 PM</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Cambiar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.completeButton, completedMeals.snack && styles.completedButton]}
                  onPress={() => completeMeal('snack')}
                >
                  <Text style={[styles.completeButtonText, completedMeals.snack && styles.completedButtonText]}>
                    {completedMeals.snack ? '✓ Completado' : 'Completar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.mealName}>
              {completedMeals.snack ? 'Se completaron las calorías del snack ✓' : 'Yogur Griego con Almendras'}
            </Text>
            <View style={styles.mealNutrition}>
              <Text style={styles.mealCalories}>240 cal</Text>
              <Text style={styles.mealMacro}>20g proteína • 12g carbos • 12g grasas</Text>
            </View>
          </View>

          {/* Cena */}
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <View style={styles.mealTimeContainer}>
                <View style={[styles.mealIcon, styles.dinnerIcon]}>
                  <View style={styles.moonIcon}>
                    <View style={styles.moonBody} />
                    <View style={styles.moonCrater1} />
                    <View style={styles.moonCrater2} />
                  </View>
                </View>
                <View>
                  <Text style={styles.mealTime}>Cena</Text>
                  <Text style={styles.mealHour}>07:30 PM</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Cambiar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.completeButton, completedMeals.dinner && styles.completedButton]}
                  onPress={() => completeMeal('dinner')}
                >
                  <Text style={[styles.completeButtonText, completedMeals.dinner && styles.completedButtonText]}>
                    {completedMeals.dinner ? '✓ Completado' : 'Completar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.mealName}>
              {completedMeals.dinner ? 'Se completaron las calorías de la cena ✓' : 'Pollo al Horno con Batata'}
            </Text>
            <View style={styles.mealNutrition}>
              <Text style={styles.mealCalories}>520 cal</Text>
              <Text style={styles.mealMacro}>45g proteína • 35g carbos • 18g grasas</Text>
            </View>
          </View>
        </View>
        
        {/* <View style={styles.cardContainer}>
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
        </View> */}
      </ScrollView>

      {/* Modal de Celebración */}
      <Modal
        visible={showCelebration}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.celebrationModal}>
          <ConfettiCannon
            ref={confettiRef}
            count={300}
            origin={{ x: Dimensions.get('window').width / 2, y: -50 }}
            autoStart={false}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={2000}
            colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']}
          />
          
          <View style={styles.celebrationContent}>
            <Text style={styles.celebrationEmoji}>✅</Text>
            <Text style={styles.celebrationTitle}>¡Felicidades Crack!</Text>
            <Text style={styles.celebrationSubtitle}>Completaste todas las comidas del día</Text>
            <Text style={styles.celebrationProgress}>100% Completo 🎉</Text>
            
            <TouchableOpacity 
              style={styles.celebrationButton}
              onPress={() => setShowCelebration(false)}
            >
              <Text style={styles.celebrationButtonText}>¡Genial! 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Mensaje Motivacional */}
      <Modal
        visible={showMotivationalMessage}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.motivationalModalOverlay}>
          <View style={styles.motivationalModal}>
            <View style={styles.motivationalGlow} />
            <Text style={styles.motivationalText}>{currentMotivationalMessage}</Text>
            <View style={styles.motivationalIndicator}>
              <View style={styles.motivationalDot} />
              <Text style={styles.motivationalTip}>Tip del día</Text>
            </View>
          </View>
        </View>
      </Modal>
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

  // Estilos para la sección de progress bars
  progressSection: {
    marginBottom: 30,
  },
  progressTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 2,
  },
  progressSubtext: {
    fontSize: 10,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  // Indicadores de comidas
  mealIndicators: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mealIndicator: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(100, 116, 139, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.5)',
  },
  mealIndicatorCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: 'rgba(16, 185, 129, 0.6)',
  },
  indicatorText: {
    fontSize: 16,
    marginBottom: 4,
  },
  indicatorLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  // Estilos para la sección de plan de comidas
  mealPlanSection: {
    marginBottom: 30,
  },
  mealPlanTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  mealPlanSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },

  // Cards de comidas del día
  mealCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mealIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTime: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
  },
  mealHour: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },
  changeButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  changeButtonText: {
    fontSize: 12,
    color: '#3B82F6',
    fontFamily: 'Inter_700Bold',
  },
  mealName: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
  },
  mealNutrition: {
    alignItems: 'flex-start',
  },
  mealCalories: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  mealMacro: {
    fontSize: 12,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
  },

  // Colores específicos para cada comida
  breakfastIcon: {
    backgroundColor: '#F59E0B', // Amarillo para desayuno (mañana)
  },
  lunchIcon: {
    backgroundColor: '#EF4444', // Rojo para almuerzo (mediodía)
  },
  snackIcon: {
    backgroundColor: '#10B981', // Verde para snack
  },
  dinnerIcon: {
    backgroundColor: '#8B5CF6', // Púrpura para cena (noche)
  },

  // Iconos específicos para cada comida
  // Icono de sol (desayuno)
  sunIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunCenter: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  sunRay1: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: 'white',
    borderRadius: 1,
    top: -4,
  },
  sunRay2: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: 'white',
    borderRadius: 1,
    bottom: -4,
  },
  sunRay3: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    left: -4,
  },
  sunRay4: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    right: -4,
  },

  // Icono de plato (almuerzo)
  plateIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateBase: {
    width: 18,
    height: 18,
    backgroundColor: 'white',
    borderRadius: 9,
  },
  plateFood1: {
    position: 'absolute',
    width: 6,
    height: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 3,
    top: 4,
    left: 3,
  },
  plateFood2: {
    position: 'absolute',
    width: 4,
    height: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 2,
    top: 3,
    right: 3,
  },

  // Icono de fruta (snack)
  fruitIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fruitBase: {
    width: 14,
    height: 14,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  fruitLeaf: {
    position: 'absolute',
    top: -2,
    right: 2,
    width: 4,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // Icono de luna (cena)
  moonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonBody: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  moonCrater1: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 1.5,
    top: 3,
    left: 4,
  },
  moonCrater2: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 1,
    bottom: 4,
    right: 3,
  },

  // Estilos para botones de completado
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  completeButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  completedButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: 'rgba(16, 185, 129, 0.6)',
  },
  completeButtonText: {
    fontSize: 12,
    color: '#10B981',
    fontFamily: 'Inter_700Bold',
  },
  completedButtonText: {
    color: '#059669',
  },

  // Estilos para la celebración
  celebrationModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationContent: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.8)',
    shadowColor: 'rgba(16, 185, 129, 0.8)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    marginHorizontal: 40,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  celebrationTitle: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  celebrationProgress: {
    fontSize: 20,
    color: '#10B981',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  celebrationButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  celebrationButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },

  // Estilos para el mensaje motivacional
  motivationalModalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  motivationalModal: {
    backgroundColor: 'rgba(30, 41, 59, 0.98)',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: 'rgba(16, 185, 129, 0.6)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    position: 'relative',
    overflow: 'hidden',
  },
  motivationalGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  motivationalText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  motivationalIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  motivationalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationalTip: {
    fontSize: 12,
    color: '#10B981',
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Estilos para mini progress bars de macronutrientes
  macroProgressSection: {
    marginBottom: 30,
  },
  macroProgressTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
  },
  macroProgressContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 12,
  },
  macroProgressSubtitle: {
    fontSize: 14,
    color: '#10B981',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  macroProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  macroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  macroIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  macroLabel: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(100, 116, 139, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  proteinFill: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  carbsFill: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  fatsFill: {
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  progressPercentage: {
    fontSize: 11,
    color: '#94A3B8',
    fontFamily: 'Inter_700Bold',
    minWidth: 35,
    textAlign: 'right',
  },

  // Estilos para circular progress bars de macronutrientes
  circularMacroRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
  },
  circularMacroItem: {
    alignItems: 'center',
    flex: 1,
  },
  circularProgressText: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  circularMacroLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
});

