import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { BACKEND_CONFIG, ENDPOINTS } from '../config/backend';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // URL del backend desde la configuración
  const BACKEND_URL = BACKEND_CONFIG.ACTIVE_URL;

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Intentando login con:', email);
      
      // Hacer petición fetch a tu backend
      const response = await fetch(`${BACKEND_URL}${ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password: password,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data);

      if (response.ok) {
        // Login exitoso
        console.log('Login exitoso para:', data.user?.email || email);
        
        // Guardar datos del usuario y token
        await AsyncStorage.multiSet([
          ['isLoggedIn', 'true'],
          ['userEmail', data.user?.email || email],
          ['authToken', data.access_token || ''],
          ['userData', JSON.stringify(data.user || {})],
        ]);

        Alert.alert(
          'Bienvenido!',
          `Hola ${data.user?.firstName || 'Usuario'}! Has iniciado sesión exitosamente.`,
          [
            {
              text: 'Continuar',
              onPress: () => navigation.replace('HomeScreen')
            }
          ]
        );

      } else {
        // Error del servidor
        const errorMessage = data.message || 'Credenciales incorrectas';
        console.error('Error del servidor:', data);
        
        Alert.alert(
          'Error de Autenticación',
          errorMessage,
          [{ text: 'Reintentar' }]
        );
      }

    } catch (error) {
      console.error('Error de conexión:', error);
      
      Alert.alert(
        'Error de Conexión',
        'No se pudo conectar con el servidor. Verifica tu conexión a internet y que el backend esté funcionando.',
        [
          { text: 'Reintentar' }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert(
        'Email requerido',
        'Por favor, ingresa tu email en el campo correspondiente y luego toca "¿Olvidaste tu contraseña?"',
        [{ text: 'OK' }]
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un email válido');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch(`${BACKEND_URL}${ENDPOINTS.FORGOT_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Email enviado',
          data.message || 'Se ha enviado un enlace de recuperación a tu email.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Error',
          data.message || 'No se pudo enviar el email de recuperación.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error en forgot password:', error);
      Alert.alert(
        'Error de Conexión',
        'No se pudo conectar con el servidor.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Funcionalidad de registro próximamente');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Esymbel-Fitness</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Main Content */}
          <View style={styles.main}>
            {/* Welcome Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.welcomeTitle}>Bienevenido</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email o Nombre de Usuario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu correo electrónico o nombre de usuario"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Forgot Password */}
              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#0F172A" />
                    <Text style={[styles.loginButtonText, { marginLeft: 8 }]}>
                      Iniciando sesión...
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              No tienes una cuenta?{' '}
              <Text style={styles.signUpText} onPress={handleSignUp}>
                Registrarse
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSpacer: {
    width: 40,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: 'white',
    borderWidth: 0,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  loginButton: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 9999, // rounded-full equivalent
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  signUpText: {
    fontWeight: '500',
    color: '#10B981',
  },
});