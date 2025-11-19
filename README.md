# API de Gestión de Usuarios y Archivos

API REST desarrollada con Node.js y Express que permite el registro de usuarios, autenticación con JWT y gestión de archivos (subida, descarga y eliminación).

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🚀 Configuración e Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Ev_modulo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=4000
JWT_SECRET=TuSecretoMuySeguroAqui
JWT_EXPIRES_IN=1d
UPLOAD_DIR=uploads
MAX_FILE_SIZE_BYTES=5242880
ALLOWED_MIME_TYPES=image/jpeg,image/png,application/pdf
```

**Descripción de las variables:**
- `PORT`: Puerto en el que se ejecutará el servidor
- `JWT_SECRET`: Secreto para firmar los tokens JWT (¡cámbialo por algo más seguro!)
- `JWT_EXPIRES_IN`: Tiempo de expiración de los tokens (ej: 1d, 2h, 30m)
- `UPLOAD_DIR`: Directorio donde se guardarán los archivos subidos
- `MAX_FILE_SIZE_BYTES`: Tamaño máximo de archivo permitido en bytes (5MB por defecto)
- `ALLOWED_MIME_TYPES`: Tipos MIME permitidos separados por comas

### 4. Ejecutar la aplicación

**Modo desarrollo (con auto-restart):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor se iniciará en `http://localhost:4000`

## 📚 Rutas de la API

### 🔐 Autenticación y Usuarios

#### Registrar un nuevo usuario
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-generado",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Iniciar sesión
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Obtener información del usuario autenticado
```http
GET /api/users/me
Authorization: Bearer <tu-token-jwt>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-del-usuario",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### 📁 Gestión de Archivos

#### Subir un archivo (requiere autenticación)
```http
POST /api/files/upload
Authorization: Bearer <tu-token-jwt>
Content-Type: multipart/form-data

file: <archivo>
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "filename": "1637276400000-documento.pdf",
    "size": 204800,
    "mimetype": "application/pdf"
  },
  "message": "File uploaded"
}
```

#### Descargar/Ver un archivo (público)
```http
GET /api/files/:filename
```

Ejemplo: `GET /api/files/1637276400000-documento.pdf`

El archivo se descargará o visualizará en el navegador.

#### Eliminar un archivo (requiere autenticación)
```http
DELETE /api/files/:filename
Authorization: Bearer <tu-token-jwt>
```

Ejemplo: `DELETE /api/files/1637276400000-documento.pdf`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "File deleted"
}
```

## 🧪 Cómo Probar la API

### Opción 1: Usando cURL

**1. Registrar usuario:**
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com","password":"password123"}'
```

**2. Iniciar sesión:**
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"password123"}'
```

**3. Obtener perfil (copia el token de la respuesta anterior):**
```bash
curl -X GET http://localhost:4000/api/users/me \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

**4. Subir archivo:**
```bash
curl -X POST http://localhost:4000/api/files/upload \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -F "file=@ruta/a/tu/archivo.pdf"
```

**5. Descargar archivo:**
```bash
curl -X GET http://localhost:4000/api/files/NOMBRE_ARCHIVO \
  -O
```

**6. Eliminar archivo:**
```bash
curl -X DELETE http://localhost:4000/api/files/NOMBRE_ARCHIVO \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Opción 2: Usando Postman o Thunder Client

1. **Registrar usuario:**
   - Método: POST
   - URL: `http://localhost:4000/api/users/register`
   - Body (JSON):
     ```json
     {
       "name": "Juan Pérez",
       "email": "juan@example.com",
       "password": "password123"
     }
     ```

2. **Iniciar sesión:**
   - Método: POST
   - URL: `http://localhost:4000/api/users/login`
   - Body (JSON):
     ```json
     {
       "email": "juan@example.com",
       "password": "password123"
     }
     ```
   - Copia el `token` de la respuesta

3. **Obtener perfil:**
   - Método: GET
   - URL: `http://localhost:4000/api/users/me`
   - Headers: `Authorization: Bearer <tu-token>`

4. **Subir archivo:**
   - Método: POST
   - URL: `http://localhost:4000/api/files/upload`
   - Headers: `Authorization: Bearer <tu-token>`
   - Body: form-data
   - Key: `file`, Type: File, Value: selecciona un archivo

5. **Descargar archivo:**
   - Método: GET
   - URL: `http://localhost:4000/api/files/<nombre-del-archivo>`

6. **Eliminar archivo:**
   - Método: DELETE
   - URL: `http://localhost:4000/api/files/<nombre-del-archivo>`
   - Headers: `Authorization: Bearer <tu-token>`

## 📂 Estructura del Proyecto

```
Ev_modulo/
├── src/
│   ├── config/
│   │   └── index.js          # Configuración de variables de entorno
│   ├── controllers/
│   │   ├── fileController.js # Lógica de gestión de archivos
│   │   └── userController.js # Lógica de autenticación y usuarios
│   ├── middleware/
│   │   └── auth.js           # Middleware de autenticación JWT
│   ├── models/
│   │   └── users.js          # Modelo de usuarios (en memoria)
│   ├── routes/
│   │   ├── files.js          # Rutas de archivos
│   │   └── users.js          # Rutas de usuarios
│   ├── utils/
│   │   └── storage.js        # Utilidades de almacenamiento
│   ├── app.js                # Configuración de Express
│   └── server.js             # Punto de entrada de la aplicación
├── uploads/                   # Directorio de archivos subidos
├── .env                       # Variables de entorno (no subir a Git)
├── .gitignore                 # Archivos ignorados por Git
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

## 🔒 Seguridad

- Los passwords se almacenan en texto plano (⚠️ **solo para desarrollo/demo**). En producción, usar bcrypt u otro hash.
- El JWT_SECRET debe ser una cadena larga y aleatoria en producción.
- Los archivos se validan por tipo MIME y tamaño máximo.
- Las rutas de subida y eliminación de archivos requieren autenticación.

## ⚠️ Errores Comunes

**Error: "Cannot set headers after they are sent"**
- Asegúrate de usar `return` antes de `res.json()` o `res.status()`

**Error: "File too large"**
- Ajusta `MAX_FILE_SIZE_BYTES` en el archivo `.env`

**Error: "Missing token" o "Invalid token"**
- Verifica que estés enviando el header `Authorization: Bearer <token>`
- Asegúrate de que el token no haya expirado

**Error: "File not found" al descargar**
- Verifica que el nombre del archivo sea correcto
- Asegúrate de que el directorio `uploads/` exista

## 📝 Notas Adicionales

- Los usuarios se almacenan en memoria, se perderán al reiniciar el servidor
- Los archivos subidos permanecen en el directorio `uploads/`
- El tamaño máximo de archivo por defecto es 5MB
- Solo se permiten imágenes JPEG/PNG y archivos PDF por defecto

## 🤝 Contribuir

Si deseas contribuir a este proyecto, por favor crea un fork y envía un pull request.

## 📄 Licencia

ISC
