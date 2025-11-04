# Test Técnico - Desarrollador Fullstack (Consulta UF)

Solución al test técnico para el puesto de Desarrollador Fullstack. El proyecto es una aplicación web completa (Frontend y Backend) que permite a los usuarios consultar el valor de la UF (Unidad de Fomento) por fecha, consumiendo la API pública de `mindicador.cl`.

El proyecto fue desarrollado en un plazo menor a 24 horas, cumpliendo con todos los requisitos funcionales y añadiendo valor a través de una arquitectura robusta, una interfaz de usuario moderna y un enfoque en la seguridad.

## Características principales

* **Arquitectura Fullstack:** Se implementó un backend en Node.js para gestionar la lógica de negocio y la seguridad, desacoplando al cliente.
* **Autenticación segura con JWT:** El login no se valida en el frontend. El backend valida las credenciales y genera un **JSON Web Token (JWT)** para gestionar la sesión.
* **Persistencia de sesión:** La aplicación cumple con el requisito de mantener la sesión activa. El JWT se almacena en `localStorage` y se envía en los *headers* de las peticiones, permitiendo al usuario cerrar el navegador y volver a entrar sin loguearse.
* **Rutas protegidas:** La página de consulta es una ruta privada. Si un usuario no autenticado intenta acceder, es redirigido automáticamente al Login.
* **UI profesional:** Se utilizó **Material-UI (MUI)** para construir una interfaz moderna, limpia y 100% responsiva, incluyendo un `DatePicker` avanzado y un tema de color personalizado.
* **Manejo de errores completo:** La aplicación maneja errores de validación (fechas vacías, fechas futuras) y errores de la API externa (como un servidor caído), mostrando mensajes claros al usuario.

---

## Stack tecnológico

El stack fue elegido para demostrar modernidad, robustez y escalabilidad.

### Frontend (`/client`)
* **Framework:** React 18+
* **Lenguaje:** TypeScript
* **UI Kit:** Material-UI (MUI) v5
* **Routing:** React Router DOM v6
* **Peticiones HTTP:** Axios
* **Manejo de fechas:** Day.js (para el `DatePicker` de MUI)
* **Manejo de estado (Auth):** React Context API

### Backend (`/server`)
* **Plataforma:** Node.js
* **Framework:** Express
* **Lenguaje:** TypeScript
* **Autenticación:** JSON Web Token (JWT)
* **Variables de Entorno:** `dotenv`
* **Peticiones HTTP:** Axios
* **CORS:** `cors`

---

## Instalación y ejecución

Se necesita **Node.js v18+** instalado. El proyecto es un monorepo con dos carpetas: `/client` y `/server`.

### 1. Backend

En una terminal, navega a la carpeta del servidor e inicia:

```bash
# 1. Ir a la carpeta del servidor
cd server

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor (en modo desarrollo)
npm run dev
```

### 2. Frontend
``` bash
# 1. Ir a la carpeta del cliente
cd client

# 2. Instalar dependencias
npm install

# 3. Iniciar el cliente (Vite)
npm run dev
```

El fronted se ejecutará en `http://localhost:5173`.

### Credenciales de prueba
* Usuario: *admin*
* Contraseña: *1234*


