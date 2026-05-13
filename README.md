# Calendary_arq_web

Proyecto web de calendario desarrollado con una arquitectura separada entre **frontend**, **backend** y **base de datos**.  
La aplicación permite trabajar con una estructura cliente-servidor, utilizando **MongoDB** como sistema de almacenamiento y **Docker** para facilitar la ejecución local de la base de datos.

---

## Descripción del proyecto

**Calendary_arq_web** es una aplicación web orientada a la gestión de información relacionada con un calendario.  
El proyecto está organizado en dos partes principales:

- **calendar-backend:** API desarrollada con Node.js, TypeScript y conexión a MongoDB.
- **calendar-frontend:** interfaz web encargada de consumir los servicios del backend.

La base de datos MongoDB se ejecuta mediante Docker Compose, lo que permite levantar el entorno de forma más sencilla y ordenada.

---

## Estructura del proyecto

```bash
proyecto calendario/
│
├── calendar-backend/
│   ├── src/
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── calendar-frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Tecnologías utilizadas

### Backend

- Node.js
- TypeScript
- Express
- MongoDB
- Docker
- Docker Compose
- Nodemon
- ts-node
- JWT para autenticación

### Frontend

- Proyecto web basado en npm
- Interfaz cliente para consumo de API

### Base de datos

- MongoDB ejecutado en contenedor Docker

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js
- npm
- Git
- Docker Desktop
- Un editor de código, por ejemplo Visual Studio Code

---

## Configuración de variables de entorno

Dentro de la carpeta `calendar-backend`, crea un archivo llamado `.env`.

Ejemplo de configuración:

```env
PORT=3000
JWT_SEED=tu_clave_secreta
MONGO_URL=mongodb://mern_user:1234567@localhost:27017/?authSource=admin
MONGO_DB_NAME=calendar_db
```

> Importante: el archivo `.env` no debe subirse a GitHub, ya que contiene datos sensibles como claves, usuarios y contraseñas.

---

## Ejecutar MongoDB con Docker

Primero abre **Docker Desktop**.

Luego, desde la carpeta del backend, ejecuta:

```bash
cd calendar-backend
docker compose up -d
```

Para verificar que el contenedor está corriendo:

```bash
docker ps
```

Debe aparecer un contenedor similar a:

```bash
calendar-mongo
```

---

## Ejecutar el backend

Desde la carpeta `calendar-backend`, instala las dependencias:

```bash
npm install
```

Luego ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

Si todo está correctamente configurado, la terminal mostrará:

```bash
Mongo connected
Server is running on port 3000
```

El backend quedará disponible en:

```bash
http://localhost:3000
```

---

## Ejecutar el frontend

Abre una nueva terminal y entra a la carpeta del frontend:

```bash
cd calendar-frontend
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el proyecto:

```bash
npm run dev
```

La terminal mostrará la URL local para abrir la aplicación en el navegador, por ejemplo:

```bash
http://localhost:5173
```

o

```bash
http://localhost:4200
```

---

## Comandos rápidos para iniciar el proyecto

### 1. Iniciar MongoDB

```bash
cd calendar-backend
docker compose up -d
```

### 2. Iniciar backend

```bash
cd calendar-backend
npm run dev
```

### 3. Iniciar frontend

```bash
cd calendar-frontend
npm run dev
```

---

## Comandos útiles

Ver contenedores activos:

```bash
docker ps
```

Ver logs de MongoDB:

```bash
docker logs calendar-mongo
```

Detener MongoDB:

```bash
docker compose down
```

Reiniciar el backend con Nodemon:

```bash
rs
```

Ver estado de Git:

```bash
git status
```

Subir cambios a GitHub:

```bash
git add .
git commit -m "Actualizar proyecto"
git push
```

---

## Seguridad

Este proyecto utiliza variables de entorno para proteger información sensible.  
Por esa razón, el archivo `.env` está excluido del repositorio mediante `.gitignore`.

Archivos y carpetas que no deben subirse:

```bash
node_modules/
.env
dist/
build/
mongo/
```

---

## Estado del proyecto

Proyecto en desarrollo.  
Actualmente cuenta con la configuración del backend, frontend y base de datos MongoDB mediante Docker.

---

## Repositorio

```bash
https://github.com/CarlosMendoza11/Calendary_arq_web
```

---

## Autor

Desarrollado por **Carlos Mendoza**.
