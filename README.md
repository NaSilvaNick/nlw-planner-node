# Iniciar o projeto

npm init -y

# Dependencias de Desenvolvimento

npm i typescript @types/node tsx prisma -D

# Dependencias

npm i fastify

# Iniciar configurações do TypeScript

npx tsc --init

# github de conf do tsconfig.json

// tsconfig bases : https://github.com/tsconfig/bases

# Iniciar prisma com SQLite

npx prisma init --datasource-provider SQLite

# Gerar migrations do prisma

npx prisma migrate dev

# Gerar cliente do prisma

npx prisma generate

# package.json

npx tsx watch src/server.ts