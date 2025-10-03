import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { RecipesScreen, WorkoutScreen } from './src/screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para las pantallas principales
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="RecipesTab" 
        component={RecipesScreen}
        options={{
          tabBarLabel: 'Recetas',
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons 
              name="restaurant-menu" 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="WorkoutTab" 
        component={WorkoutScreen}
        options={{
          tabBarLabel: 'Entrenamiento',
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5 
              name="dumbbell" 
              size={size || 22} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SplashScreen" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
