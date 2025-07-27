FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência e instala os pacotes
COPY package*.json ./
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Copia o script wait-for-it para aguardar o MySQL
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expõe a porta que a API usa
EXPOSE 3333

# Define o comando padrão ao iniciar o container
CMD ["sh", "-c", "wait-for-it.sh mysql:3306 --timeout=60 --strict -- npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start"]
