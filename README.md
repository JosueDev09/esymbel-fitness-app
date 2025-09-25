# 🏋️‍♀️ Esymbel Fitness App

Una aplicación completa de fitness y nutrición desarrollada con React Native y Expo, que incluye seguimiento de macronutrientes, recetas saludables, búsqueda de alimentos, y un sistema gamificado de progreso diario.

## ✨ Características Principales

- 🍽️ **Seguimiento Nutricional Completo** - Macronutrientes, calorías y progreso diario
- �‍🍳 **Base de Recetas Saludables** - Recetas completas con información nutricional
- 🔍 **Búsqueda de Alimentos** - Base de datos extensa con 20+ alimentos
- 🎯 **Progress Bars Circulares** - Visualización elegante del progreso diario/semanal
- 🎉 **Sistema Gamificado** - Confetti y celebraciones al completar objetivos
- 🏆 **Mensajes Motivacionales** - Sistema dinámico de motivación
- 🥤 **Integración con IA** - Botón de asistente inteligente para nutrición
- ✨ **Diseño Glass Morphism** - UI moderna con efectos de cristal profesionales

## �📁 Estructura del Proyecto

```
esymbel-fitness-app/
├── 📱 App.tsx                     # Componente principal de la aplicación
├── 📄 index.ts                   # Punto de entrada de la aplicación
├── ⚙️ babel.config.js            # Configuración de Babel
├── 🎨 global.css                 # Estilos globales de Tailwind
├── 📦 package.json               # Dependencias y scripts
├── 🔧 tsconfig.json              # Configuración de TypeScript
├── 🎨 tailwind.config.js         # Configuración de Tailwind CSS
├── 
├── 📁 assets/                    # Recursos estáticos
│   ├── icon.png
│   ├── favicon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
└── 📁 src/                       # Código fuente principal
    ├── 📁 screens/               # Pantallas de la aplicación
    │   ├── HomeScreen.tsx            # 🏠 Dashboard principal con progreso
    │   ├── NutrientSearchScreen.tsx  # 🔍 Búsqueda de alimentos y nutrientes
    │   ├── RecipesScreen.tsx         # 👨‍� Recetas saludables con integración
    │   ├── WorkoutScreen.tsx         # 🏋️‍♀️ Pantalla de entrenamientos
    │   ├── ProfileScreen.tsx         # 👤 Pantalla de perfil de usuario
    │   ├── NutritionScreen.tsx       # 🍎 Información nutricional adicional
    │   └── index.ts                  # Exportaciones de pantallas
    │
    └── 📁 navigation/            # Sistema de navegación
        └── AppNavigator.tsx          # Tab navigator con efectos glass
```

## 🚀 Pantallas y Funcionalidades

### 🏠 HomeScreen - Dashboard Principal
**Funciones principales:**
- ✅ **Seguimiento de Comidas**: Sistema de check para desayuno, almuerzo, snack y cena
- 📊 **Progress Bars Circulares**: Visualización elegante de progreso diario y semanal
- 🎯 **Macronutrientes Detallados**: Tracking de proteínas, carbohidratos y grasas
- 🎉 **Sistema de Celebración**: Confetti cannon al completar 100% del progreso
- 💬 **Mensajes Motivacionales**: Sistema dinámico que cambia según el progreso
- 📈 **Estadísticas Semanales**: Progress bars para objetivos a largo plazo
- 💾 **Persistencia**: Guarda automáticamente el progreso con AsyncStorage

### 🔍 NutrientSearchScreen - Base de Datos de Alimentos
**Características avanzadas:**
- 🥗 **20+ Alimentos**: Base de datos completa con información nutricional precisa
- 🔍 **Búsqueda Inteligente**: Filtro en tiempo real por nombre de alimento
- 📏 **Cálculo Personalizado**: Ajusta cantidades y calcula macros automáticamente
- 🤖 **Asistente IA**: Botón con efectos glass para consultas nutricionales
- 🎨 **UI Glass Morphism**: Efectos de cristal profesionales en toda la interfaz
- 📱 **Responsive**: Adaptado para diferentes tamaños de pantalla

### 👨‍� RecipesScreen - Recetas Saludables
**Sistema completo de recetas:**
- 🍽️ **5 Recetas Completas**: Desde desayunos hasta cenas balanceadas
- 📊 **Integración con Progreso**: Suma automática de macros al plan diario
- 🎯 **Categorías**: Filtros por Desayuno, Almuerzo, Cena y más
- 📋 **Información Detallada**: Ingredientes, instrucciones paso a paso
- ⏱️ **Tiempo de Preparación**: Información de dificultad y tiempo
- 🏷️ **Tags Nutricionales**: "Alto en proteína", "Bajo en carbos", etc.
- 🎉 **Confirmación Visual**: Alerts que muestran nutrientes agregados

### 🏋️‍♀️ WorkoutScreen
- Pantalla en desarrollo para rutinas de entrenamiento
- Diseño consistente con el tema glass de la app

### 👤 ProfileScreen
- Información personal del usuario
- Estadísticas y configuraciones
- Diseño moderno con efectos glass

## 🎨 Diseño y UI/UX

### 🌟 Glass Morphism Design System
- **Efectos de Cristal**: Backgrounds translúcidos con blur y bordes luminosos
- **Overlays Profesionales**: Capas múltiples para efectos de profundidad
- **Sombras Dinámicas**: Sistema de elevación con sombras coloridas
- **Transparencias Graduales**: rgba() con opacidades calculadas para realismo

### 🎨 Paleta de Colores
- **Fondo Principal**: `#0F172A` (slate-900) - Base oscura profesional
- **Glass Cards**: `rgba(30, 41, 59, 0.4)` - Transparencia con profundidad
- **Bordes Glass**: `rgba(255, 255, 255, 0.1-0.4)` - Luminosidad sutil
- **Progress Bars**: 
  - Calorías: `#EF4444` (red-500)
  - Proteínas: `#10B981` (emerald-500)  
  - Carbohidratos: `#3B82F6` (blue-500)
  - Grasas: `#8B5CF6` (violet-500)
- **Acentos**: `#F59E0B` (amber-500) para elementos interactivos

### 📱 Tipografía
- **Poppins**: Títulos y headers con peso bold
- **Inter**: Texto regular optimizado para legibilidad
- **Escalas Responsivas**: 10px-32px con line-height optimizado

### 🎭 Elementos Interactivos
- **Botones Glass**: Efectos hover con transformaciones suaves
- **Tab Navigator**: Barra inferior con glass morphism y iconos custom
- **Progress Rings**: Animaciones circulares con gradientes dinámicos
- **Modals**: Presentación fullscreen con backgrounds blur

## 📱 Comandos Disponibles

```bash
# Iniciar el proyecto
npm start

# Abrir en Android
npm run android

# Abrir en iOS
npm run ios

# Abrir en web
npm run web
```

## 🔧 Stack Tecnológico

### 🚀 Core Framework
- **React Native 0.81.4** - Framework multiplataforma
- **Expo ~54.0.10** - Plataforma de desarrollo y deployment
- **TypeScript ~5.9.2** - Tipado estático robusto
- **React 19.1.0** - Última versión con Concurrent Features

### 🎨 Styling & UI
- **NativeWind ^4.2.1** - Tailwind CSS para React Native
- **TailwindCSS ^3.4.17** - Framework de utilidades CSS
- **Expo Google Fonts** - Poppins e Inter optimizadas
- **React Native SVG ^15.13.0** - Iconos vectoriales personalizados

### 🧭 Navegación
- **React Navigation ^7.1.17** - Sistema de navegación nativo
- **Bottom Tabs ^7.4.7** - Tab navigator con efectos custom
- **Safe Area Context ^5.6.1** - Manejo de áreas seguras

### 📊 Visualización de Datos
- **React Native Circular Progress ^1.4.1** - Progress bars circulares animados
- **React Native Confetti Cannon ^1.5.2** - Efectos de celebración

### 💾 Persistencia y Estado
- **AsyncStorage ^2.2.0** - Almacenamiento local persistente
- **React Hooks** - Manejo de estado moderno con useState/useEffect

### 🎭 Animaciones y Efectos
- **React Native Reanimated ^4.1.1** - Animaciones de alto rendimiento
- **Expo Blur ~15.0.7** - Efectos de desenfoque nativo
- **Custom Glass Effects** - Sistema propio de glass morphism

### 🏗️ Herramientas de Desarrollo
- **Babel Preset Expo** - Transpilación optimizada
- **Metro Bundler** - Empaquetado rápido y eficiente
- **TypeScript Strict Mode** - Validación estricta de tipos

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Nutrición Completo
- [x] Seguimiento de macronutrientes (proteínas, carbos, grasas)
- [x] Progress bars circulares con animaciones
- [x] Cálculo automático de calorías
- [x] Persistencia de datos con AsyncStorage
- [x] Sistema de comidas diarias (4 comidas tracking)

### ✅ Base de Datos de Alimentos
- [x] 20+ alimentos con información nutricional precisa
- [x] Búsqueda en tiempo real con filtros
- [x] Cálculo personalizado de cantidades
- [x] Integración con asistente IA

### ✅ Sistema de Recetas
- [x] 5 recetas saludables completas
- [x] Categorización por tipo de comida
- [x] Integración automática con progreso diario
- [x] Instrucciones paso a paso detalladas

### ✅ Gamificación y UX
- [x] Sistema de celebración con confetti
- [x] Mensajes motivacionales dinámicos
- [x] Progreso semanal y diario
- [x] Efectos glass morphism profesionales

### ✅ Navegación y Arquitectura
- [x] Tab navigator con iconos custom
- [x] Efectos glass en barra de navegación
- [x] TypeScript estricto en toda la app
- [x] Arquitectura modular y escalable

## 🚀 Próximas Funcionalidades

### 🎯 En Desarrollo
- [ ] **Sistema de Metas Personalizadas** - Objetivos de calorías/macros customizables
- [ ] **Historial de Progreso** - Gráficos semanales y mensuales
- [ ] **Más Recetas** - Expandir base de datos a 20+ recetas
- [ ] **Cámara para Alimentos** - Reconocimiento visual de comidas
- [ ] **Sincronización Cloud** - Backup y sync entre dispositivos

### 💡 Ideas Futuras
- [ ] **Integración con Wearables** - Apple Watch, Fitbit, etc.
- [ ] **API de Nutrición Externa** - Base de datos más amplia
- [ ] **Planes de Comida IA** - Generación automática de menús
- [ ] **Sistema Social** - Compartir logros y recetas
- [ ] **Notificaciones Push** - Recordatorios de comidas y agua

## 🏃‍♀️ Cómo Empezar

### 📋 Prerrequisitos
```bash
# Asegúrate de tener instalado:
- Node.js (v18 o superior)
- Expo CLI global
- iOS Simulator o Android Emulator (opcional)
```

### 🚀 Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/JosueDev09/esymbel-fitness-app.git

# 2. Navegar al directorio
cd esymbel-fitness-app

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm start
```

### 📱 Testing
```bash
# Abrir en Android
npm run android

# Abrir en iOS
npm run ios  

# Abrir en web browser
npm run web

# O escanear QR code con Expo Go
```

## 📊 Métricas del Proyecto

- **Líneas de Código**: ~3,500+ líneas
- **Componentes**: 6 pantallas principales
- **Base de Datos**: 20+ alimentos, 5 recetas completas
- **Dependencias**: 20+ paquetes optimizados
- **TypeScript Coverage**: 100%
- **Tiempo de Desarrollo**: Desarrollo iterativo profesional

## 🤝 Contribución

¿Quieres contribuir? ¡Genial! Esta app está en constante evolución.

### 🔧 Áreas de Interés
- 🍎 **Nutrición**: Agregar más alimentos y recetas
- 🎨 **UI/UX**: Mejorar efectos glass y animaciones  
- 🏋️‍♀️ **Fitness**: Implementar sistema de ejercicios
- 📊 **Analytics**: Gráficos avanzados de progreso
- 🤖 **IA**: Expandir funcionalidades inteligentes

---

## 🏆 Estado del Proyecto

**🟢 PRODUCCIÓN LISTA** - App completamente funcional con todas las características core implementadas.

*¡Tu compañero perfecto para un estilo de vida saludable!* 💪🥗✨
