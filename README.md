# stolenBike

[![Build Status](https://travis-ci.com/yeukfei02/stolenBike.svg?branch=master)](https://travis-ci.com/yeukfei02/stolenBike)
[![codecov](https://codecov.io/gh/yeukfei02/stolenBike/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/stolenBike)

Help you to find stolen bike

## Requirement:
 - install yarn
 - install node (v12+)

## Testing and run:
```
$ yarn

// development
$ yarn run dev

// production
$ yarn run production

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint
```

open localhost:5000

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/stolen-bike:<tag> .
docker run -p 3000:3000 -d <username>/stolen-bike:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```

build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/stolenBike/blob/master/CONTRIBUTING.md)
