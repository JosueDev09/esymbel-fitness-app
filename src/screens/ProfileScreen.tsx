import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Switch, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const profileData = {
    name: 'Ethan Carter',
    username: '@ethan.carter',
    bio: 'Fitness Enthusiast',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbLssUiHMdVhWgJwrQbbXwoWJOl1COE7thOdKadewOiuz3CJYRWSKIo86eW3ZGfrmedFE8VEF8RWiVLmq8rnrIMv2TrVc5Xln2iaLGgjENTfG1KGZM5Q4-NgoYTHT0Ew8PKq4Re_6Gi2UvnxXC8HNshPtRIlwS2q_wygNy2VzoD6kpHZieCvoYHawLelBbS8JvcWLl-IJEJoqhbL3MgjxpMi_PEKeabiaV2geBxfGo13lgE9HRaef-Hh72sFI0aPo2Pvvs63h5gkeF'
  };

  const personalStats = [
    { label: 'Weight', value: '75 kg' },
    { label: 'Height', value: '180 cm' },
    { label: 'BMI', value: '23.1' },
    { label: 'Age', value: '28' },
    { label: 'Gender', value: 'Male' },
    { label: 'Goal', value: 'Maintain' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('userEmail');
              
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'There was a problem logging out');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profileData.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profileData.name}</Text>
            <Text style={styles.username}>{profileData.username}</Text>
            <Text style={styles.userBio}>{profileData.bio}</Text>
          </View>
        </View>

        {/* Personal Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Personal Stats</Text>
          <View style={styles.statsGrid}>
            {personalStats.map((stat, index) => (
              <View key={index} style={[styles.statItem, index % 2 === 0 ? styles.statItemLeft : styles.statItemRight]}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Share Progress Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share Progress</Text>
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          {/* Notifications */}
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceContent}>
              <View style={styles.preferenceIconContainer}>
                <Ionicons name="notifications" size={24} color="white" />
              </View>
              <Text style={styles.preferenceText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#20314b', true: '#001433' }}
              thumbColor="white"
              ios_backgroundColor="#20314b"
            />
          </View>

          {/* Units of Measurement */}
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceContent}>
              <View style={styles.preferenceIconContainer}>
                <Ionicons name="resize" size={24} color="white" />
              </View>
              <Text style={styles.preferenceText}>Units of Measurement</Text>
            </View>
            <Text style={styles.preferenceValue}>Metric</Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1724', // Exact color from HTML
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f1724',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingRight: 48, // Balance the back button
  },
  headerSpacer: {
    width: 48,
  },
  
  // ScrollView
  scrollView: {
    flex: 1,
  },
  
  // Profile Section
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    gap: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#8da7ce',
    textAlign: 'center',
    marginBottom: 2,
  },
  userBio: {
    fontSize: 16,
    color: '#8da7ce',
    textAlign: 'center',
  },
  
  // Stats Section
  statsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 8,
    paddingTop: 16,
  },
  statsGrid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2e466b',
    gap: 4,
  },
  statItemLeft: {
    paddingRight: 8,
  },
  statItemRight: {
    paddingLeft: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#8da7ce',
  },
  statValue: {
    fontSize: 14,
    color: 'white',
  },
  
  // Share Button
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  shareButton: {
    backgroundColor: '#001433',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Preferences Section
  preferencesSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f1724',
    paddingHorizontal: 16,
    minHeight: 56,
    gap: 16,
  },
  preferenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  preferenceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#20314b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferenceText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  preferenceValue: {
    fontSize: 16,
    color: 'white',
  },
  
  // Logout Section
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 100, // Space for navigation
  },
  logoutButton: {
    backgroundColor: '#001433',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
