import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Tipos de datos
interface Recipe {
  id: number;
  name: string;
  emoji: string;
  category: string;
  cookTime: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  serves: number;
  ingredients: {
    name: string;
    amount: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }[];
  instructions: string[];
  totalNutrition: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  tags: string[];
}

// Base de datos de recetas
const RECIPES_DATABASE: Recipe[] = [
  {
    id: 1,
    name: 'Ensalada de Pollo y Aguacate',
    emoji: '🥗',
    category: 'Almuerzo',
    cookTime: '15 min',
    difficulty: 'Fácil',
    serves: 2,
    ingredients: [
      { name: 'Pechuga de pollo', amount: '200g', calories: 330, proteins: 62, carbs: 0, fats: 7.2 },
      { name: 'Aguacate', amount: '1 pieza', calories: 240, proteins: 3, carbs: 12, fats: 22 },
      { name: 'Espinaca', amount: '2 tazas', calories: 14, proteins: 1.8, carbs: 2.2, fats: 0.2 },
      { name: 'Aceite de oliva', amount: '1 cucharada', calories: 119, proteins: 0, carbs: 0, fats: 14 }
    ],
    instructions: [
      'Cocina la pechuga de pollo a la plancha con sal y pimienta',
      'Corta el aguacate en cubos medianos',
      'Lava y corta las hojas de espinaca',
      'Mezcla todos los ingredientes en un bowl',
      'Aliña con aceite de oliva y disfruta'
    ],
    totalNutrition: {
      calories: 703,
      proteins: 66.8,
      carbs: 14.2,
      fats: 43.4
    },
    tags: ['Alto en proteína', 'Bajo en carbohidratos', 'Saludable']
  },
  {
    id: 2,
    name: 'Bowl de Salmón y Quinoa',
    emoji: '🍚',
    category: 'Cena',
    cookTime: '25 min',
    difficulty: 'Intermedio',
    serves: 2,
    ingredients: [
      { name: 'Salmón', amount: '200g', calories: 416, proteins: 50.8, carbs: 0, fats: 26.8 },
      { name: 'Quinoa cocida', amount: '150g', calories: 180, proteins: 6, carbs: 30, fats: 3 },
      { name: 'Brócoli', amount: '1 taza', calories: 25, proteins: 2.6, carbs: 5.1, fats: 0.3 },
      { name: 'Almendras', amount: '28g', calories: 164, proteins: 6, carbs: 6, fats: 14 }
    ],
    instructions: [
      'Cocina la quinoa según las instrucciones del paquete',
      'Asa el salmón con hierbas aromáticas',
      'Cocina el brócoli al vapor por 5 minutos',
      'Tuesta ligeramente las almendras',
      'Sirve todo en un bowl y combina los sabores'
    ],
    totalNutrition: {
      calories: 785,
      proteins: 65.4,
      carbs: 41.1,
      fats: 44.1
    },
    tags: ['Rico en Omega-3', 'Completo', 'Nutritivo']
  },
  {
    id: 3,
    name: 'Batido Proteico de Plátano',
    emoji: '🥤',
    category: 'Desayuno',
    cookTime: '5 min',
    difficulty: 'Fácil',
    serves: 1,
    ingredients: [
      { name: 'Plátano', amount: '1 pieza', calories: 105, proteins: 1.3, carbs: 27, fats: 0.4 },
      { name: 'Leche', amount: '250ml', calories: 153, proteins: 8, carbs: 12, fats: 8 },
      { name: 'Avena', amount: '30g', calories: 117, proteins: 5.1, carbs: 20, fats: 2.1 },
      { name: 'Almendras', amount: '20g', calories: 116, proteins: 4.3, carbs: 4.3, fats: 10 }
    ],
    instructions: [
      'Pela y corta el plátano en trozos',
      'Agrega todos los ingredientes a la licuadora',
      'Licúa por 60 segundos hasta obtener consistencia cremosa',
      'Sirve inmediatamente y disfruta'
    ],
    totalNutrition: {
      calories: 491,
      proteins: 18.7,
      carbs: 63.3,
      fats: 20.5
    },
    tags: ['Energético', 'Post-entreno', 'Rápido']
  },
  {
    id: 4,
    name: 'Tacos de Pescado con Verduras',
    emoji: '🌮',
    category: 'Almuerzo',
    cookTime: '20 min',
    difficulty: 'Intermedio',
    serves: 4,
    ingredients: [
      { name: 'Filete de pescado blanco', amount: '300g', calories: 450, proteins: 90, carbs: 0, fats: 9 },
      { name: 'Tortillas integrales', amount: '4 piezas', calories: 280, proteins: 12, carbs: 48, fats: 6 },
      { name: 'Repollo morado', amount: '100g', calories: 31, proteins: 1.4, carbs: 7, fats: 0.1 },
      { name: 'Aguacate', amount: '1 pieza', calories: 240, proteins: 3, carbs: 12, fats: 22 }
    ],
    instructions: [
      'Sazona y cocina el pescado a la plancha',
      'Calienta las tortillas en un comal',
      'Corta finamente el repollo morado',
      'Prepara guacamole con el aguacate',
      'Arma los tacos con todos los ingredientes'
    ],
    totalNutrition: {
      calories: 1001,
      proteins: 106.4,
      carbs: 67,
      fats: 37.1
    },
    tags: ['Mexicano', 'Colorido', 'Balanceado']
  },
  {
    id: 5,
    name: 'Parfait de Yogur y Frutos Rojos',
    emoji: '🍓',
    category: 'Desayuno',
    cookTime: '10 min',
    difficulty: 'Fácil',
    serves: 2,
    ingredients: [
      { name: 'Yogur griego natural', amount: '300g', calories: 180, proteins: 30, carbs: 12, fats: 1.2 },
      { name: 'Fresas', amount: '150g', calories: 48, proteins: 1, carbs: 11.7, fats: 0.5 },
      { name: 'Arándanos', amount: '100g', calories: 57, proteins: 0.7, carbs: 14.5, fats: 0.3 },
      { name: 'Nueces', amount: '30g', calories: 196, proteins: 4.6, carbs: 4, fats: 19.6 }
    ],
    instructions: [
      'Lava y corta las fresas en trozos pequeños',
      'En un vaso, coloca una capa de yogur',
      'Agrega una capa de fresas y arándanos',
      'Repite las capas hasta llenar el vaso',
      'Corona con nueces picadas'
    ],
    totalNutrition: {
      calories: 481,
      proteins: 36.3,
      carbs: 42.2,
      fats: 21.6
    },
    tags: ['Antioxidantes', 'Probióticos', 'Colorido']
  }
];

const CATEGORIES = ['Todas', 'Desayuno', 'Almuerzo', 'Cena', 'Snack'];
const DIFFICULTY_COLORS = {
  'Fácil': '#10B981',
  'Intermedio': '#F59E0B',
  'Avanzado': '#EF4444'
};

export default function RecipesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [dailyProgress, setDailyProgress] = useState({
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  });

  // Cargar progreso diario
  useEffect(() => {
    loadDailyProgress();
  }, []);

  const loadDailyProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('dailyNutritionProgress');
      if (progress) {
        setDailyProgress(JSON.parse(progress));
      }
    } catch (error) {
      console.log('Error cargando progreso:', error);
    }
  };

  const saveDailyProgress = async (newProgress: typeof dailyProgress) => {
    try {
      await AsyncStorage.setItem('dailyNutritionProgress', JSON.stringify(newProgress));
      setDailyProgress(newProgress);
    } catch (error) {
      console.log('Error guardando progreso:', error);
    }
  };

  // Filtrar recetas por categoría
  const filteredRecipes = RECIPES_DATABASE.filter(recipe => 
    selectedCategory === 'Todas' || recipe.category === selectedCategory
  );

  // Agregar receta al plan diario
  const addRecipeToDaily = (recipe: Recipe) => {
    const newProgress = {
      calories: dailyProgress.calories + recipe.totalNutrition.calories,
      proteins: dailyProgress.proteins + recipe.totalNutrition.proteins,
      carbs: dailyProgress.carbs + recipe.totalNutrition.carbs,
      fats: dailyProgress.fats + recipe.totalNutrition.fats
    };

    saveDailyProgress(newProgress);
    
    Alert.alert(
      '🎉 ¡Receta Agregada!',
      `${recipe.name} se agregó a tu plan diario.\n\n` +
      `Agregaste:\n` +
      `🔥 ${recipe.totalNutrition.calories} calorías\n` +
      `🥩 ${recipe.totalNutrition.proteins.toFixed(1)}g proteínas\n` +
      `🍞 ${recipe.totalNutrition.carbs.toFixed(1)}g carbohidratos\n` +
      `🥑 ${recipe.totalNutrition.fats.toFixed(1)}g grasas`,
      [{ text: 'Genial!' }]
    );
    
    setShowRecipeModal(false);
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => {
        setSelectedRecipe(item);
        setShowRecipeModal(true);
      }}
    >
      <View style={styles.recipeHeader}>
        <Text style={styles.recipeEmoji}>{item.emoji}</Text>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeCategory}>{item.category}</Text>
            <Text style={styles.recipeSeparator}>•</Text>
            <Text style={styles.recipeCookTime}>⏱️ {item.cookTime}</Text>
            <Text style={styles.recipeSeparator}>•</Text>
            <Text style={[
              styles.recipeDifficulty,
              { color: DIFFICULTY_COLORS[item.difficulty] }
            ]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.nutritionPreview}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.totalNutrition.calories}</Text>
          <Text style={styles.nutritionLabel}>cal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.totalNutrition.proteins.toFixed(0)}g</Text>
          <Text style={styles.nutritionLabel}>prot</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.totalNutrition.carbs.toFixed(0)}g</Text>
          <Text style={styles.nutritionLabel}>carbs</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{item.totalNutrition.fats.toFixed(0)}g</Text>
          <Text style={styles.nutritionLabel}>grasas</Text>
        </View>
      </View>
      
      <View style={styles.recipeTags}>
        {item.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={styles.recipeTag}>
            <Text style={styles.recipeTagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Recetas Saludables 👨‍🍳</Text>
        <Text style={styles.subtitle}>Cocina delicioso y alcanza tus macros</Text>
        
        {/* Progreso Diario */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Tu Progreso de Hoy 📊</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <AnimatedCircularProgress
                size={60}
                width={4}
                fill={Math.min((dailyProgress.calories / 2000) * 100, 100)}
                tintColor="#EF4444"
                backgroundColor="rgba(239, 68, 68, 0.2)"
                lineCap="round"
              >
                {() => (
                  <Text style={styles.progressText}>{dailyProgress.calories.toFixed(0)}</Text>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.progressLabel}>Calorías</Text>
            </View>
            
            <View style={styles.progressItem}>
              <AnimatedCircularProgress
                size={60}
                width={4}
                fill={Math.min((dailyProgress.proteins / 150) * 100, 100)}
                tintColor="#10B981"
                backgroundColor="rgba(16, 185, 129, 0.2)"
                lineCap="round"
              >
                {() => (
                  <Text style={styles.progressText}>{dailyProgress.proteins.toFixed(0)}</Text>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.progressLabel}>Proteínas</Text>
            </View>
            
            <View style={styles.progressItem}>
              <AnimatedCircularProgress
                size={60}
                width={4}
                fill={Math.min((dailyProgress.carbs / 200) * 100, 100)}
                tintColor="#3B82F6"
                backgroundColor="rgba(59, 130, 246, 0.2)"
                lineCap="round"
              >
                {() => (
                  <Text style={styles.progressText}>{dailyProgress.carbs.toFixed(0)}</Text>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.progressLabel}>Carbos</Text>
            </View>
            
            <View style={styles.progressItem}>
              <AnimatedCircularProgress
                size={60}
                width={4}
                fill={Math.min((dailyProgress.fats / 80) * 100, 100)}
                tintColor="#8B5CF6"
                backgroundColor="rgba(139, 92, 246, 0.2)"
                lineCap="round"
              >
                {() => (
                  <Text style={styles.progressText}>{dailyProgress.fats.toFixed(0)}</Text>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.progressLabel}>Grasas</Text>
            </View>
          </View>
        </View>
        
        {/* Filtros de categoría */}
       
        
        {/* Lista de recetas */}
        <View style={styles.recipesContainer}>
          <Text style={styles.recipesTitle}>
            Recetas Disponibles ({filteredRecipes.length})
          </Text>
          
          <FlatList
            data={filteredRecipes}
            renderItem={renderRecipeCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      
      {/* Modal de detalle de receta */}
      <Modal
        visible={showRecipeModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedRecipe && (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowRecipeModal(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.recipeDetailHeader}>
                  <Text style={styles.recipeDetailEmoji}>{selectedRecipe.emoji}</Text>
                  <Text style={styles.recipeDetailName}>{selectedRecipe.name}</Text>
                  <Text style={styles.recipeDetailServes}>Para {selectedRecipe.serves} personas</Text>
                </View>
                
                {/* Ingredientes */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🛒 Ingredientes</Text>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Text style={styles.ingredientName}>{ingredient.name}</Text>
                      <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                    </View>
                  ))}
                </View>
                
                {/* Instrucciones */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>👨‍🍳 Preparación</Text>
                  {selectedRecipe.instructions.map((step, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>{index + 1}</Text>
                      <Text style={styles.instructionText}>{step}</Text>
                    </View>
                  ))}
                </View>
                
                {/* Información nutricional */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📊 Información Nutricional</Text>
                  <View style={styles.nutritionGrid}>
                    <View style={styles.nutritionCard}>
                      <Text style={styles.nutritionCardValue}>{selectedRecipe.totalNutrition.calories}</Text>
                      <Text style={styles.nutritionCardLabel}>Calorías</Text>
                    </View>
                    <View style={styles.nutritionCard}>
                      <Text style={styles.nutritionCardValue}>{selectedRecipe.totalNutrition.proteins.toFixed(1)}g</Text>
                      <Text style={styles.nutritionCardLabel}>Proteínas</Text>
                    </View>
                    <View style={styles.nutritionCard}>
                      <Text style={styles.nutritionCardValue}>{selectedRecipe.totalNutrition.carbs.toFixed(1)}g</Text>
                      <Text style={styles.nutritionCardLabel}>Carbohidratos</Text>
                    </View>
                    <View style={styles.nutritionCard}>
                      <Text style={styles.nutritionCardValue}>{selectedRecipe.totalNutrition.fats.toFixed(1)}g</Text>
                      <Text style={styles.nutritionCardLabel}>Grasas</Text>
                    </View>
                  </View>
                </View>
                
                {/* Botón agregar */}
                <TouchableOpacity
                  style={styles.addRecipeButton}
                  onPress={() => addRecipeToDaily(selectedRecipe)}
                >
                  <Text style={styles.addRecipeButtonText}>
                    ➕ Agregar a mi Plan Diario
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
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
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 30,
  },
  
  // Progreso diario
  progressSection: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Categorías
  categoryContainer: {
    marginBottom: 25,
  },
  categoryButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  categoryText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: 'white',
  },
  
  // Recetas
  recipesContainer: {
    flex: 1,
  },
  recipesTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  recipeCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipeEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  recipeCategory: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  recipeSeparator: {
    color: '#64748B',
    marginHorizontal: 6,
    fontSize: 12,
  },
  recipeCookTime: {
    fontSize: 12,
    color: '#64748B',
  },
  recipeDifficulty: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Información nutricional previa
  nutritionPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  nutritionLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  
  // Tags
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recipeTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  recipeTagText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  modalContent: {
    padding: 20,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Detalle de receta
  recipeDetailHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  recipeDetailEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  recipeDetailName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  recipeDetailServes: {
    fontSize: 14,
    color: '#64748B',
  },
  
  // Secciones
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  
  // Ingredientes
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ingredientName: {
    fontSize: 14,
    color: 'white',
    flex: 1,
  },
  ingredientAmount: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  
  // Instrucciones
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    backgroundColor: '#10B981',
    color: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    lineHeight: 20,
  },
  
  // Grid nutricional
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  nutritionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  nutritionCardValue: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nutritionCardLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  
  // Botón agregar receta
  addRecipeButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addRecipeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
