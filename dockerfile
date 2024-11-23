# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos necesarios (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia solo el archivo .env
COPY . .

# Compila la aplicación de NestJS (si es necesario)
RUN npm run build

# Expone el puerto en el que la app escuchará (por defecto es el 3000)
EXPOSE 3000

# Define el comando que ejecutará la app en modo producción
CMD ["npm", "run", "start:prod"]
