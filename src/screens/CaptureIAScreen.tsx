import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

export default function CaptureIAScreen({ navigation }: { navigation: any }) {
  const [description, setDescription] = useState('Pollo a la plancha (150g), brócoli al vapor (100g) y arroz integral (50g).');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#64748b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registro de Comida</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Analiza tu comida</Text>
          <Text style={styles.subtitle}>
            Toma una foto o sube una imagen de tu comida para que la IA analice los macronutrientes.
          </Text>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          {/* Capture Photo Button */}
          <TouchableOpacity style={styles.captureButton}>
            <MaterialIcons name="photo-camera" size={24} color="white" />
            <Text style={styles.captureButtonText}>Capturar Foto</Text>
          </TouchableOpacity>

          {/* Image Preview */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ 
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu06kyLe9grE6E2sBPdV6UBTsh5L9PbkovTIcin7kQtoHHASm3nwJTt_XfH9QT0flCh8P6CqIUebXyo1pJy4CYAsL1nH4k3L20zAxYV1ds_2PnRiN46VrMeSWGpzL4nJ4lulRxvde_aSwh9veXUc9z-tyjOXMNrcYAC8oultEn8IA6SVUX_oTdJ2t4DgATHO5x9BEefy6ZmtTZIX-ZBFh_dCXKDSzMyPncANwaat05kkWEpMnWfRk_g9q8eriAtsKiT5xIY5oGictt'
              }}
              style={styles.foodImage}
              alt="Plato de comida con pollo a la parrilla, brócoli y arroz"
            />
          </View>

          {/* AI Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Descripción de la IA</Text>
            
            <View style={styles.descriptionCard}>
              <TextInput
                style={styles.descriptionInput}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
                placeholder="Descripción de la comida..."
                placeholderTextColor="#64748b"
              />
              
              <View style={styles.macroInfo}>
                <Text style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Proteínas:</Text> 45g
                </Text>
                <Text style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Carbohidratos:</Text> 40g
                </Text>
                <Text style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Grasas:</Text> 10g
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1723', // background-dark
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 35, 0.8)', // background-dark/80 with backdrop-blur effect
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSpacer: {
    width: 40,
  },
  
  // Main Content
  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  
  // Title Section
  titleSection: {
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8', // slate-400
    lineHeight: 24,
  },
  
  // Action Section
  actionSection: {
    gap: 16,
  },
  
  // Capture Button
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A', // primary
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Image Container
  imageContainer: {
    aspectRatio: 16/9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e293b', // slate-800
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  
  // Description Section
  descriptionSection: {
    gap: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  descriptionCard: {
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 12,
    padding: 16,
  },
  descriptionInput: {
    color: '#cbd5e1', // slate-300
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  macroInfo: {
    marginTop: 8,
    gap: 4,
  },
  macroItem: {
    fontSize: 14,
    color: '#94a3b8', // slate-400
  },
  macroLabel: {
    fontWeight: 'bold',
  },
  
  // Footer
  footer: {
    backgroundColor: 'rgba(15, 23, 35, 0.8)', // background-dark/80 with backdrop-blur effect
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  addButton: {
    backgroundColor: '#0F172A', // primary
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});