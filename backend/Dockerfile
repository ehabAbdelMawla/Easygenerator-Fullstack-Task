FROM node:20
WORKDIR /easygenerator
RUN npm install -g pnpm 
COPY package.json* package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 5555
CMD ["pnpm",  "start:dev"]
