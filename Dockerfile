FROM node:18

# Crear carpeta app y entrar
WORKDIR /app

# Copiar archivos
COPY . .

# Instalar dependencias
RUN yarn

# Exponer el puerto (opcional)
EXPOSE 3000

# Comando para iniciar el bot
CMD ["yarn", "start"]
