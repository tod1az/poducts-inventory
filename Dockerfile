# Usa la imagen base de Node.js y asegúrate de que sea compatible con pnpm
FROM node:18-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y pnpm-lock.yaml al directorio de trabajo
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias
RUN pnpm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando de inicio con las opciones necesarias
CMD ["pnpm", "dev", "-H", "0.0.0.0", "-p", "3000"]
