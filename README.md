# 🏋️‍♀️ Esymbel Fitness App

Una aplicación de fitness y nutrición desarrollada con React Native y Expo.

## 📁 Estructura del Proyecto

```
esymbel-fitness-app/
├── 📱 App.tsx                 # Componente principal de la aplicación
├── 📄 index.ts               # Punto de entrada de la aplicación
├── ⚙️ babel.config.js        # Configuración de Babel
├── 🎨 global.css             # Estilos globales de Tailwind
├── 📦 package.json           # Dependencias y scripts
├── 🔧 tsconfig.json          # Configuración de TypeScript
├── 🎨 tailwind.config.js     # Configuración de Tailwind CSS
├── 
├── 📁 assets/                # Recursos estáticos
│   ├── icon.png
│   ├── favicon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
└── 📁 src/                   # Código fuente principal
    ├── 📁 screens/           # Pantallas de la aplicación
    │   ├── HomeScreen.tsx        # 🏠 Pantalla principal
    │   ├── NutritionScreen.tsx   # 🍎 Pantalla de nutrición
    │   ├── WorkoutScreen.tsx     # 🏋️‍♀️ Pantalla de entrenamientos
    │   ├── ProfileScreen.tsx     # 👤 Pantalla de perfil
    │   └── index.ts              # Exportaciones de pantallas
    │
    ├── 📁 components/        # Componentes reutilizables
    ├── 📁 navigation/        # Configuración de navegación
    ├── 📁 hooks/             # Custom hooks
    ├── 📁 services/          # Servicios y APIs
    ├── 📁 types/             # Definiciones de TypeScript
    └── 📁 utils/             # Funciones utilitarias
```

## 🚀 Pantallas Disponibles

### 🏠 HomeScreen
- Pantalla de bienvenida con tarjetas de navegación
- Acceso rápido a las principales funciones
- Diseño de cards con iconos y descripciones

### 🍎 NutritionScreen
- Plan nutricional diario
- Estadísticas de calorías, proteínas y carbohidratos
- Lista de comidas recomendadas con horarios

### 🏋️‍♀️ WorkoutScreen
- Rutinas de entrenamiento personalizadas
- Progreso semanal
- Diferentes niveles de dificultad
- Información detallada de cada workout

### 👤 ProfileScreen
- Información personal del usuario
- Estadísticas físicas (peso, altura, IMC)
- Logros y achievements
- Opciones de configuración

## 🎨 Diseño

- **Tema**: Modo oscuro con colores vibrantes
- **Fuentes**: 
  - Poppins (títulos y headers)
  - Inter (texto regular)
- **Colores principales**:
  - Fondo: `#0F172A` (slate-900)
  - Cards: `#1E293B` (slate-800)
  - Primario: `#3B82F6` (blue-500)
  - Secundario: `#10B981` (emerald-500)
  - Acento: `#F87171` (red-400)

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

## 🔧 Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Tailwind CSS** (NativeWind) - Estilos utilitarios
- **Expo Google Fonts** - Fuentes personalizadas

## 📂 Próximos Pasos

1. **Navegación**: Implementar React Navigation para navegar entre pantallas
2. **Estado Global**: Agregar Context API o Redux para manejo de estado
3. **Animaciones**: Implementar animaciones con React Native Reanimated
4. **Persistencia**: Agregar AsyncStorage para guardar datos localmente
5. **API**: Conectar con servicios backend para datos dinámicos

## 🏃‍♀️ Cómo Empezar

1. Asegúrate de tener Expo CLI instalado
2. Ejecuta `npm install` para instalar dependencias
3. Ejecuta `npm start` para iniciar el servidor de desarrollo
4. Escanea el QR code con Expo Go en tu dispositivo móvil

¡Tu app de fitness está lista para crecer! 💪
