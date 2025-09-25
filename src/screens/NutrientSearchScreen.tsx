import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Tipos
interface FoodItem {
  id: number;
  name: string;
  category: string;
  emoji: string;
  unit: string;
  baseAmount: number;
  nutrients: {
    proteins: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}

// Base de datos de alimentos (simulada)
const FOOD_DATABASE: FoodItem[] = [
  // Carnes
  {
    id: 1,
    name: 'Filete de Carne de Res',
    category: 'Carnes',
    emoji: '🥩',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 26.0,
      carbs: 0.0,
      fats: 15.0,
      calories: 250
    }
  },
  {
    id: 2,
    name: 'Pechuga de Pollo',
    category: 'Carnes',
    emoji: '🍗',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 31.0,
      carbs: 0.0,
      fats: 3.6,
      calories: 165
    }
  },
  {
    id: 3,
    name: 'Salmón',
    category: 'Pescados',
    emoji: '🐟',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 25.4,
      carbs: 0.0,
      fats: 13.4,
      calories: 208
    }
  },
  // Lácteos
  {
    id: 4,
    name: 'Leche Entera',
    category: 'Lácteos',
    emoji: '🥛',
    unit: 'ml',
    baseAmount: 100,
    nutrients: {
      proteins: 3.2,
      carbs: 4.8,
      fats: 3.2,
      calories: 61
    }
  },
  {
    id: 5,
    name: 'Queso Cheddar',
    category: 'Lácteos',
    emoji: '🧀',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 25.0,
      carbs: 1.3,
      fats: 33.0,
      calories: 403
    }
  },
  {
    id: 6,
    name: 'Yogur Natural',
    category: 'Lácteos',
    emoji: '🥛',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 10.0,
      carbs: 4.0,
      fats: 0.4,
      calories: 59
    }
  },
  // Cereales y Granos
  {
    id: 7,
    name: 'Arroz Blanco Cocido',
    category: 'Cereales',
    emoji: '🍚',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 2.7,
      carbs: 28.0,
      fats: 0.3,
      calories: 130
    }
  },
  {
    id: 8,
    name: 'Pan Integral',
    category: 'Cereales',
    emoji: '🍞',
    unit: 'rebanada (30g)',
    baseAmount: 30,
    nutrients: {
      proteins: 3.6,
      carbs: 12.0,
      fats: 1.2,
      calories: 74
    }
  },
  {
    id: 9,
    name: 'Avena',
    category: 'Cereales',
    emoji: '🥣',
    unit: 'gramos',
    baseAmount: 100,
    nutrients: {
      proteins: 16.9,
      carbs: 66.3,
      fats: 6.9,
      calories: 389
    }
  },
  // Frutas
  {
    id: 10,
    name: 'Plátano',
    category: 'Frutas',
    emoji: '🍌',
    unit: 'pieza (120g)',
    baseAmount: 120,
    nutrients: {
      proteins: 1.3,
      carbs: 27.0,
      fats: 0.4,
      calories: 105
    }
  },
  {
    id: 11,
    name: 'Manzana',
    category: 'Frutas',
    emoji: '🍎',
    unit: 'pieza (180g)',
    baseAmount: 180,
    nutrients: {
      proteins: 0.5,
      carbs: 25.0,
      fats: 0.3,
      calories: 95
    }
  },
  {
    id: 12,
    name: 'Aguacate',
    category: 'Frutas',
    emoji: '🥑',
    unit: 'pieza (150g)',
    baseAmount: 150,
    nutrients: {
      proteins: 3.0,
      carbs: 12.0,
      fats: 22.0,
      calories: 240
    }
  },
  // Vegetales
  {
    id: 13,
    name: 'Brócoli',
    category: 'Vegetales',
    emoji: '🥦',
    unit: 'taza (90g)',
    baseAmount: 90,
    nutrients: {
      proteins: 2.6,
      carbs: 5.1,
      fats: 0.3,
      calories: 25
    }
  },
  {
    id: 14,
    name: 'Espinaca',
    category: 'Vegetales',
    emoji: '🥬',
    unit: 'taza (30g)',
    baseAmount: 30,
    nutrients: {
      proteins: 0.9,
      carbs: 1.1,
      fats: 0.1,
      calories: 7
    }
  },
  // Legumbres
  {
    id: 15,
    name: 'Frijoles Negros',
    category: 'Legumbres',
    emoji: '🫘',
    unit: 'taza (180g)',
    baseAmount: 180,
    nutrients: {
      proteins: 15.0,
      carbs: 40.0,
      fats: 0.9,
      calories: 227
    }
  },
  {
    id: 16,
    name: 'Lentejas',
    category: 'Legumbres',
    emoji: '🫘',
    unit: 'taza (200g)',
    baseAmount: 200,
    nutrients: {
      proteins: 18.0,
      carbs: 40.0,
      fats: 0.8,
      calories: 230
    }
  },
  // Frutos Secos
  {
    id: 17,
    name: 'Almendras',
    category: 'Frutos Secos',
    emoji: '🌰',
    unit: 'porción (28g)',
    baseAmount: 28,
    nutrients: {
      proteins: 6.0,
      carbs: 6.0,
      fats: 14.0,
      calories: 164
    }
  },
  {
    id: 18,
    name: 'Nueces',
    category: 'Frutos Secos',
    emoji: '🥜',
    unit: 'porción (28g)',
    baseAmount: 28,
    nutrients: {
      proteins: 4.3,
      carbs: 4.0,
      fats: 18.5,
      calories: 185
    }
  },
  // Aceites y Grasas
  {
    id: 19,
    name: 'Aceite de Oliva',
    category: 'Aceites',
    emoji: '🫒',
    unit: 'cucharada (15ml)',
    baseAmount: 15,
    nutrients: {
      proteins: 0.0,
      carbs: 0.0,
      fats: 14.0,
      calories: 119
    }
  },
  {
    id: 20,
    name: 'Mantequilla',
    category: 'Grasas',
    emoji: '🧈',
    unit: 'cucharada (14g)',
    baseAmount: 14,
    nutrients: {
      proteins: 0.1,
      carbs: 0.0,
      fats: 11.5,
      calories: 102
    }
  }
];

export default function NutrientSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  // Filtrar alimentos basado solo en búsqueda
  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calcular nutrientes para cantidad personalizada
  const calculateNutrients = (food: FoodItem, amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (!numAmount || numAmount <= 0) return food.nutrients;
    
    const multiplier = numAmount / food.baseAmount;
    return {
      proteins: (food.nutrients.proteins * multiplier).toFixed(1),
      carbs: (food.nutrients.carbs * multiplier).toFixed(1),
      fats: (food.nutrients.fats * multiplier).toFixed(1),
      calories: Math.round(food.nutrients.calories * multiplier)
    };
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => {
    const nutrients = calculateNutrients(item, customAmount || item.baseAmount);
    const displayAmount = customAmount || item.baseAmount;

    return (
      <TouchableOpacity 
        style={styles.foodCard}
        onPress={() => setSelectedFood(selectedFood?.id === item.id ? null : item)}
      >
        <View style={styles.foodHeader}>
          <Text style={styles.foodEmoji}>{item.emoji}</Text>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodCategory}>{item.category}</Text>
            <Text style={styles.foodUnit}>Por {displayAmount} {item.unit}</Text>
          </View>
        </View>
        
        {selectedFood?.id === item.id && (
          <View style={styles.nutritionDetails}>
            <View style={styles.customAmountContainer}>
              <Text style={styles.customAmountLabel}>Cantidad personalizada:</Text>
              <TextInput
                style={styles.customAmountInput}
                value={customAmount}
                onChangeText={setCustomAmount}
                placeholder={`${item.baseAmount}`}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>{item.unit}</Text>
            </View>
            
            <View style={styles.macroGrid}>
              <View style={styles.macroCard}>
                <Text style={styles.macroIcon}>🥩</Text>
                <Text style={styles.macroValue}>{nutrients.proteins}g</Text>
                <Text style={styles.macroLabel}>Proteínas</Text>
              </View>
              
              <View style={styles.macroCard}>
                <Text style={styles.macroIcon}>🍞</Text>
                <Text style={styles.macroValue}>{nutrients.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbohidratos</Text>
              </View>
              
              <View style={styles.macroCard}>
                <Text style={styles.macroIcon}>🥑</Text>
                <Text style={styles.macroValue}>{nutrients.fats}g</Text>
                <Text style={styles.macroLabel}>Grasas</Text>
              </View>
              
              <View style={styles.macroCard}>
                <Text style={styles.macroIcon}>🔥</Text>
                <Text style={styles.macroValue}>{nutrients.calories}</Text>
                <Text style={styles.macroLabel}>Calorías</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                Alert.alert(
                  '¡Agregado! 🎉',
                  `${item.name} (${displayAmount} ${item.unit}) agregado a tu plan del día`,
                  [{ text: 'OK' }]
                );
                setSelectedFood(null);
                setCustomAmount('');
              }}
            >
              <Text style={styles.addButtonText}>➕ Agregar a mi Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Buscador de Nutrientes 🔍</Text>
        <Text style={styles.subtitle}>Encuentra los macros de cualquier alimento</Text>
        
        {/* Barra de búsqueda con botón IA */}
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar alimento o categoría..."
              placeholderTextColor="#64748B"
            />
            <TouchableOpacity
              style={styles.aiButton}
              onPress={() => {
                Alert.alert(
                  '🤖 Asistente IA Nutricional',
                  '¡Hola! Soy tu asistente nutricional.\n\n¿Qué puedo hacer por ti?\n\n• Información de cualquier alimento\n• Cálculo de macronutrientes\n• Sugerencias de comidas\n• Equivalencias nutricionales\n\n*Función disponible próximamente',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: '🔜 Próximamente', style: 'default' }
                  ]
                );
              }}
              activeOpacity={0.8}
            >
              {/* Overlay glass superior */}
              <View style={styles.aiButtonGlassOverlay} />
              <Text style={styles.aiButtonText}>🤖</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.aiTooltip}>
            💡 Si no encuentras el alimento, pregúntale a la IA
          </Text>
        </View>
        
        {/* Lista de alimentos */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            Resultados ({filteredFoods.length})
          </Text>
          
          {filteredFoods.length === 0 && searchQuery ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>No se encontraron alimentos</Text>
              <Text style={styles.emptySubtitle}>
                Intenta con otro término de búsqueda
              </Text>
            </View>
          ) : filteredFoods.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🥗</Text>
              <Text style={styles.emptyTitle}>¡Explora nuestra base de datos!</Text>
              <Text style={styles.emptySubtitle}>
                Busca cualquier alimento para ver sus macronutrientes
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredFoods}
              renderItem={renderFoodItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
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
  
  // Búsqueda
  searchContainer: {
    marginBottom: 30,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    color: 'white',
    fontSize: 16,
  },
  aiButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)', // Fondo glass muy translúcido
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)', // Borde glass más marcado
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
    shadowColor: 'rgba(0, 0, 0, 0.8)', // Sombra más intensa para profundidad
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    // Efecto glass con overlay
    position: 'relative',
    overflow: 'hidden',
  },
  aiButtonGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%', // Solo la mitad superior
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Brillo glass sutil
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  aiButtonText: {
    fontSize: 20,
  },
  aiTooltip: {
    fontSize: 12,
    color: '#10B981', // Color verde que coincide con el tema de la app
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    backgroundColor: 'rgba(30, 41, 59, 0.4)', // Mismo glass que el botón
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Borde glass sutil
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  

  
  // Resultados
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  
  // Tarjeta de alimento
  foodCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodEmoji: {
    fontSize: 32,
    marginRight: 15,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 2,
  },
  foodUnit: {
    fontSize: 12,
    color: '#64748B',
  },
  
  // Detalles nutricionales
  nutritionDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    padding: 12,
    borderRadius: 12,
  },
  customAmountLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 12,
  },
  customAmountInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 8,
    color: 'white',
    fontSize: 16,
    minWidth: 80,
    textAlign: 'center',
    marginRight: 8,
  },
  unitText: {
    color: '#64748B',
    fontSize: 14,
  },
  
  // Grid de macros
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  macroCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  macroIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  
  // Estado vacío
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  
  // Botón agregar
  addButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
