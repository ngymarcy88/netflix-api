# netflix-api

cmd commands

docker build -t netflix-api:latest .
docker run --network netflix --name netflix-api -d -p 10030:10030 netflix-api:latest

docker build -t db-api:latest .
docker run --network netflix --name db-api -d db-api:latest

docker run --network netflix --name mongo mongo:latest

docker-compose config
docker-compose up -d
docker-compose down
