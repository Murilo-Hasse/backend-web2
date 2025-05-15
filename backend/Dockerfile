# Usar imagem oficial Node.js com Alpine para leveza
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar dependências (com cache de camadas)
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta da aplicação (ajuste se necessário)
EXPOSE 3000

# Comando padrão (pode ser substituído no docker-compose)
CMD ["npm", "run", "dev"]
