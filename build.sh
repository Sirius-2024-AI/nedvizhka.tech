cp -r frontend_main nginx/frontend_main
cp -r frontend_business nginx/frontend_business
npm install --prefix ./frontend_main
npm run --prefix frontend_main build
npm install --prefix ./frontend_business
npm run --prefix frontend_business build
docker-compose build