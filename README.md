# Produccion-Ambiente

cd ./server

npm install

npx prisma migrate dev --name "init"

npx prisma generate

npm run start
