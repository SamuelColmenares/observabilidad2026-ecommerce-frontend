# Build stage - compila React con Vite
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar todo el código
COPY . .

# Compilar TypeScript y empaquetar con Vite
RUN npm run build

# Runtime stage - sirve con nginx
FROM docker.io/library/nginx:1.29.5-alpine-slim

# Copiar configuración de nginx
COPY nginx-frontend.conf /etc/nginx/conf.d/default.conf

# Limpiar archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos compilados del stage builder
COPY --from=builder /app/dist /usr/share/nginx/html/

# Exponer puerto
EXPOSE 5173

# Verificar que existen los archivos
RUN ls -la /usr/share/nginx/html/ && echo "✓ Archivos de la app copiados correctamente"

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
