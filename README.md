# Sugggestions

## To run in Docker

```sh
cd sniffer
docker compose up -d
```

It will automatically install the node modules start node app at port **3000** and mongo db at **27017**

Volumes have been created for mongodb also so connection to container mongo can be done with 3rd party UI apps using **mongodb://localhost:27017/suggestions**

To load the data into mongodb go :

First go in the api_container using the command :

```sh
docker exec -it api_container sh
```

Then

```sh
cd src/import
npx ts-node suggestions.ts run
```

To test the suggestions endpoint
Go to the following link

[http://localhost:3000/v1/suggestions?q=tor&latitude=43.70011&longitude=-79.4163&radius=5&sort=distance](http://localhost:3000/v1/suggestions?q=tor&latitude=43.70011&longitude=-79.4163&radius=5&sort=distance)

To run test cases :

```sh
docker exec -it api_container sh
npm test
```
