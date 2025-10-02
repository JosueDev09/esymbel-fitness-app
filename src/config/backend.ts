// Configuración del Backend
// ========================

// 🔧 CAMBIA ESTA URL POR LA DE TU BACKEND NESTJS
export const BACKEND_CONFIG = {
  // Para desarrollo local
  DEVELOPMENT_URL: 'http://localhost:3000',
  
  // Para dispositivo físico (cambia la IP por la tuya)
  PHYSICAL_DEVICE_URL: 'http://192.168.1.100:3000',
  
  // Para producción
  PRODUCTION_URL: 'https://tu-backend.herokuapp.com',
  
  // URL activa (cambia esta línea según tu entorno)
  ACTIVE_URL: 'http://localhost:3000', // 👈 CAMBIA AQUÍ
};

// Endpoints que debe tener tu backend NestJS
export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  PROFILE: '/users/profile',
};

/*
📝 INSTRUCCIONES PARA TU BACKEND NESTJS:

1. Asegúrate de que tu backend esté corriendo en el puerto 3000
2. Tu endpoint de login debe ser: POST /auth/login
3. Debe recibir: { "email": "user@example.com", "password": "password123" }
4. Debe devolver: { "user": {...}, "access_token": "jwt_token" }

Ejemplo de respuesta exitosa:
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "firstName": "Juan",
    "lastName": "Pérez"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

5. Para CORS, en tu main.ts de NestJS:
app.enableCors({
  origin: true,
  credentials: true,
});

6. Para probar que tu backend funciona:
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
*/
