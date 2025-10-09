import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = useState('');

  const challenges = [
    {
      id: 1,
      title: 'Reto de 30 días para Abdominales',
      duration: '30 días',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwkn-uhg56fo71rgwK7SkLrBnPijQ9ArxrNBGM1bBZ-hBPOCGJJm2MHQf0mZypICRwHJY0NvrQVc-jEzIezCrNpRAAYDJ0ZPsuyptacHC_tq3hKzjkjf6FEwdt8-YDRHmEjj6HFBtVRuJYnha4jkxVITHXYrdhhWAws5wTa6GUzY_MGFmzXmP8IXa2_Fye0YbrMlbEAlcSBafUaOCwDe8b_cZosErCPxxnhfp-OAzbiKphdJ14hzk1cG6CWX6Bk7XZZVSdJBvFoqTv'
    },
    {
      id: 2,
      title: 'Cardio guiado por video',
      duration: '45 minutos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeoCGTbTnPn-ORjgToMf7vT_QG0fmTPAQJn9psNYuD2gymNDrJP0zLmyY4F1eejegk3phCY43z2v8IpnXml9OjaDBywKm9IXoDe_OAZiGt22jFr-Cj0zU4fC2BE-IVZg35o0HNs0XbgmXVN5h1eEv9FG7zYu-khcSwXWz4kacwsmvXEt8pww339O9k3MKFs06gljsefh2MC-072Q2aXjwsf9NpwkwQmTM6ZT5DMJsyi3wu2TMiug7OnlXKkd464KIC2g0F2-aOe_s6'
    },
    {
      id: 3,
      title: 'Yoga con guía de voz',
      duration: '60 minutos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU_lymfCfPYibI8o8v1uM-fV3gFbzyrocVKYVgepxZ9VpkZveTotp2poOxPxBIXFwOhDO8c3-M4Wdtg80Kw8ANb2vhr35gYZVQtetT2Ezdtup1-Z01s8FPFSDgzvliWhYXj8S0aCKlK5e74LpQjEQqfKbQ2u8mOivZSHJ9CIeCZLvFvbVdbNbGjdZ9mlJmGV4Zq0h7IgRkhKN9LGXwL-N3pQEAEhMnOCkMx4ecCvLg3581N8Opeu_hveH6rsDAp-jd_sysJ_Td8Z2P'
    }
  ];

  const plans = [
    {
      id: 1,
      title: 'Plan de Fuerza para Principiantes',
      subtitle: '4 semanas - 3 entrenamientos/semana',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfH3MGPqMLSdc9jd3NG_PHGV9RyoiMIxUTMNlH3RlGmmJ3ep2mIEWSMtGpg9Zm1bqt4B5Ml3sE4O8FuOEivrNik60jPlWyPBzFD_Xf4435BX5a3O8tN5djlfIHV0I5woAR-XlTU3dhnEsxyV0VAZ0FfCcE2gmn3ucAjsX9WRZpGZQgrwfuHspKBt1gwJvaPGh8HUQk_0qOH1UmnJXtUv_n4431tf6IUgM4wMWdVdlAPU0tDa4wRabk5E7zhSUyrOAL2-GmDhoXXW77'
    },
    {
      id: 2,
      title: 'Plan de Pérdida de Grasa Intensivo',
      subtitle: '8 semanas - 5 entrenamientos/semana',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGV7Hyu6iyQW9pdOg_dVdT5CKIkuDXZYtwf3B0kRJn_uzhxFXioZDvOOJHFV1zOtv_qAUqyMq0WZXnfXiDboGIWqI4UqL2y2EfnfRUHX1WERcGBF2oFHhO2x6ah_M1lZet-62KglXpdl1YEyBzoPcs9NHCp3JPFnjTxUgHraNK3-Or5gaQrprMiTItjUBqQymseAWOMTKV6BbxQvkNVARdxg_24FkVgrTqA8oZkj14kqzcpcmELF6rGY1J1BPN1zpSfWohFyOIY-S2'
    },
    {
      id: 3,
      title: 'Plan de Aumento de Masa Muscular',
      subtitle: '12 semanas - 4 entrenamientos/semana',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH0CQArUEdC57L2ncM8Rc0sePxsj2MDEvw5Pn1fov_Wra_ME8NhIIBqt94aALopJD5_O58IBYgQaCHT9YXWfCexBYtu-pzADpDqNkhVJ-KFuaUFlQSp1A_4mD-VYrXuCnndeWhJQt_Fwjsfv6hoPoJQriClQh9KXE9zH3jumjaahIRBhMeZ4eQnAEbZdAa_35B2XehgtPcc8SivDFa2V2NVLP3m26a9ARIk1BpovXee2ePJv9sFMPzgQN33SbzLeqrbj3CSjdaeZdx'
    }
  ];

  const filters = ['Tipo', 'Duración', 'Intensidad'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Entrenamientos</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar entrenamientos..."
          placeholderTextColor="#64748b"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filters */}
      {/* <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
            <Ionicons name="chevron-down" size={16} color="#64748b" />
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Challenges Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desafíos Populares</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {challenges.map((challenge) => (
              <TouchableOpacity key={challenge.id} style={styles.challengeCard}>
                <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
                <View style={styles.challengeOverlay}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDuration}>{challenge.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Workout Plans Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planes de Entrenamiento</Text>
          {plans.map((plan) => (
            <TouchableOpacity key={plan.id} style={styles.planCard}>
              <Image source={{ uri: plan.image }} style={styles.planImage} />
              <View style={styles.planContent}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Empezar Plan</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#020617',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  challengeCard: {
    width: 280,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  challengeDuration: {
    fontSize: 14,
    color: '#d1d5db',
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  planImage: {
    width: 80,
    height: 80,
  },
  planContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#38e07b',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    // Active state styling handled by individual components
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
  },
  navTextActive: {
    color: '#38e07b',
  },
});
