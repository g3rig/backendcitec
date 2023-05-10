# Utilizar imagen de debian bullseye
FROM debian:bullseye

# Instalar curl y Node.js 18
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Crear directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Limpiar cache de apt
RUN apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/*

# Exponer el puerto 4000
EXPOSE 4000

# Comando para iniciar el servidor
CMD [ "node", "src/index.js" ]
