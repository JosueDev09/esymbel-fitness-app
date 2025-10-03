import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Tipos de datos
interface Recipe {
  id: number;
  name: string;
  category: string;
  calories: string;
  protein: string;
  image: string;
}

// Base de datos de recetas
const RECIPES_DATABASE: Recipe[] = [
  {
    id: 1,
    name: 'Batido de proteínas',
    category: 'Desayuno',
    calories: '200 kcal',
    protein: '20g proteína',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqaN84E769NUCg2m3TXEPgFehdoyOxBAOek3L3CUH5R4ii-G6ItN4Y2ylIJZe-OrRz0b8MxI6fBEm_Oey1QsBmToOAH_4DvVqhpIdw4XO29NKxt9U_JffmmMgrI7Tsl5gZUGT_kF-U355gjVP_wAccwmInYHZjsmO3dvct0IWpNi3fNQqH62elrCcWX54QMLEvg4nzR7kvvbs6aNXXuEJyYkOpDqJVnH8BWECvy1qu34TtunAtBkFvmxSGCKBKQGurSzqdlsU7zc0J'
  },
  {
    id: 2,
    name: 'Ensalada de pollo',
    category: 'Almuerzo',
    calories: '400 kcal',
    protein: '30g proteína',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5ytHJCcsxlTss_SbQ01APV3uacb8EUhul3u14rg7-R3fB7IVfMSff9In1uIQouHEW4JhPn-THnMA8x5Wmjik8BdfTQFXOY-I4NHKBAwTN5CodNN6GbjeJq0oRy6WpbTmNMjUvZI7y55HMOwUoZiNErI_yAaexMbeRK12QVA9tCoUuZqWKf6xsTR91jzjeOc8GraSV8qHKOkbv81zprBJd2ApBW7c9ObR7ovLFJrXQhajFPNU-_WxbmzV-2Wuacm01AS1-i8empngT'
  },
  {
    id: 3,
    name: 'Salmón con verduras',
    category: 'Cena',
    calories: '500 kcal',
    protein: '40g proteína',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxbemubOWZcpumFY_s4VVB-tB36X9GoY-hqFNvXyHL8xC8FdbhNZq3C82f5OG6t6Gnr0e3VsFVpW8XZKxjuMUi2ZEnlw9UlOcKVza93TrFPwbSh_ADXLB269GPJkFlgaGZvHK3MlBs0HxiDcxY8lTX3kCnra3xfgmbqoiCFM6-aFx_OPH1BvkV91h5gTLaHJrBEp0yYZHAwm6cb44Lii02MqYYPpnS1AfHl3EGygF18mBpBTiVJiS8vuJi2Wc0kVkwm2EajpUz_c3K'
  }
];

const CATEGORIES = ['Todas', 'Desayuno', 'Almuerzo'];

export default function RecipesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchText, setSearchText] = useState('');

  // Filtrar recetas por categoría
  const filteredRecipes = RECIPES_DATABASE.filter(recipe => 
    selectedCategory === 'Todas' || recipe.category === selectedCategory
  );

  const renderRecipeCard = (recipe: Recipe) => (
    <View key={recipe.id} style={styles.recipeCard}>
      <View style={styles.recipeContent}>
        <Text style={styles.recipeCategory}>{recipe.category}</Text>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.recipeNutrition}>{recipe.calories} | {recipe.protein}</Text>
      </View>
      <Image 
        source={{ uri: recipe.image }} 
        style={styles.recipeImage}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>Recetas</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons 
              name="search" 
              size={20} 
              color="#64748B" 
              style={styles.searchIcon} 
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar recetas"
              placeholderTextColor="#64748B"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryTabs}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.categoryTabActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recipes List */}
        <ScrollView 
          style={styles.recipesList}
          showsVerticalScrollIndicator={false}
        >
          {filteredRecipes.map(renderRecipeCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // background-dark
  },
  content: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginTop: 8,
  },
  headerSpacer: {
    width: 48,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  
  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -10,
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#1E293B', // slate-800 equivalent
    borderRadius: 24,
    paddingVertical: 12,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    color: 'white',
    borderWidth: 0,
  },
  
  // Categories
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B', // slate-800 equivalent
  },
  categoryTabs: {
    flexDirection: 'row',
    gap: 24,
    paddingHorizontal: 16,
  },
  categoryTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 12,
  },
  categoryTabActive: {
    borderBottomColor: '#38e07b', // primary color
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B', // slate-500
  },
  categoryTextActive: {
    color: '#38e07b', // primary color
    fontWeight: 'bold',
  },
  
  // Recipes List
  recipesList: {
    flex: 1,
    paddingTop: 16,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // slate-100 dark equivalent
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  recipeContent: {
    flex: 1,
  },
  recipeCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B', // slate-500
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  recipeNutrition: {
    fontSize: 14,
    color: '#64748B', // slate-500
  },
  recipeImage: {
    width: 96, // 24 * 4 = 96px (equivalent to w-24)
    height: 96, // 24 * 4 = 96px (equivalent to h-24)
    borderRadius: 12,
    flexShrink: 0,
  },
});
