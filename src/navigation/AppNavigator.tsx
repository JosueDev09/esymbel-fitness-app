import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

// Importar las pantallas
import { HomeScreen, NutritionScreen, WorkoutScreen, ProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

// Componente personalizado para el icono de Home
const HomeIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
    <View style={styles.homeIcon}>
      <View style={styles.homeBase} />
      <View style={styles.homeRoof} />
    </View>
  </View>
);

// Componente personalizado para el icono de Nutrición
const NutritionIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
    <View style={styles.appleIcon}>
      <View style={styles.appleBody} />
      <View style={styles.appleLeaf} />
    </View>
  </View>
);

// Componente personalizado para el icono de Entrenamientos
const WorkoutIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
    <View style={styles.dumbbellIcon}>
      <View style={styles.dumbbellWeight1} />
      <View style={styles.dumbbellBar} />
      <View style={styles.dumbbellWeight2} />
    </View>
  </View>
);

// Componente personalizado para el icono de Perfil
const ProfileIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
    <View style={styles.userIcon}>
      <View style={styles.userHead} />
      <View style={styles.userBody} />
    </View>
  </View>
);

// Componente personalizado para el Tab Bar con efecto glass
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.glassTabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Renderizar el icono apropiado
          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = <HomeIcon focused={isFocused} />;
              break;
            case 'Nutrition':
              IconComponent = <NutritionIcon focused={isFocused} />;
              break;
            case 'Workout':
              IconComponent = <WorkoutIcon focused={isFocused} />;
              break;
            case 'Profile':
              IconComponent = <ProfileIcon focused={isFocused} />;
              break;
            default:
              IconComponent = <HomeIcon focused={isFocused} />;
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.tabButton,
                isFocused && styles.focusedTabButton
              ]}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {IconComponent}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen 
          name="Nutrition" 
          component={NutritionScreen}
          options={{ title: 'Nutrición' }}
        />
        <Tab.Screen 
          name="Workout" 
          component={WorkoutScreen}
          options={{ title: 'Entrenamientos' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    alignItems: 'center',
    // Agregar un halo de luz alrededor del tab bar
    shadowColor: 'rgba(59, 130, 246, 0.5)', // Sombra azul brillante
    shadowOffset: {
      width: 0,
      height: 0,
    },
    //shadowOpacity: 0.8,
   // shadowRadius: 40,
  },
  glassTabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.95)', // Fondo MUCHO más opaco y marcado
    borderRadius: 30, // Radio de 8 como solicitaste
    borderWidth: 1, // Borde más grueso
    borderColor: 'rgba(255, 255, 255, 0.5)', // Borde súper visible
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: 'rgba(0, 0, 0, 1)', // Sombra completamente negra
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.8, // Sombra muy intensa
    shadowRadius: 30,
    elevation: 25, // Máxima elevación para Android
    minWidth: '90%',
    justifyContent: 'space-around',
    // Agregar un overlay interno para más profundidad
    overflow: 'hidden',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fondo sutil para todos los botones
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  focusedTabButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.4)', // Fondo azul MÁS marcado cuando está activo
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.8)', // Borde azul muy visible
    shadowColor: 'rgba(59, 130, 246, 0.8)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIcon: {
    transform: [{ scale: 1.1 }],
  },
  
  // Iconos del tab bar (más pequeños que los de las cards)
  // Icono Home
  homeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBase: {
    width: 16,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 2,
  },
  homeRoof: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  
  // Icono Apple (reutilizado pero más pequeño)
  appleIcon: {
    position: 'relative',
    alignItems: 'center',
  },
  appleBody: {
    width: 14,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
  },
  appleLeaf: {
    position: 'absolute',
    top: -1,
    right: 4,
    width: 6,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  
  // Icono Dumbbell (más pequeño)
  dumbbellIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dumbbellWeight1: {
    width: 6,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 1,
  },
  dumbbellBar: {
    width: 12,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 1,
  },
  dumbbellWeight2: {
    width: 6,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 1,
  },
  
  // Icono User (más pequeño)
  userIcon: {
    alignItems: 'center',
  },
  userHead: {
    width: 10,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    marginBottom: 1,
  },
  userBody: {
    width: 14,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
});
