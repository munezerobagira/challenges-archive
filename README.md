# Solution hackerbay challenge

This solution has two part, the fist part is backend which contain the rest api and the second part is frontend which is the frontend mari.

# 1. Backend

## runing the backend

To run the backend you can either use docker or use npm.

### using docker

pull the image from docker hub

1. [docker pull sostene/hackerbay-backend](https://hub.docker.com/repository/docker/sostene/hackerbay-backend)
2. run the image

```
docker run -p 5555:5555 -d sostene/hackerbay-backend
```

### using npm

1. clone the repo and go into the cloned project folder
1. go into backend folder

```
cd backend
```

1. Install the dependencies by using npm

```
npm install
```

1. run the backend
   `npm start`
1. you can run test with `npm test` or `npm run test` and many more commands

# 2. Frontend

The frontend maze mario game is made using react along with viteJS.
to run the frontend you can use npm

1. clone the repo and go into the cloned project folder
1. go into frontend folder

```
cd frontend
```

1. Install the dependencies by using npm

```
npm install
```

1. run the backend
   `npm dev`
