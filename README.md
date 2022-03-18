# stolenBike

[![Build Status](https://travis-ci.com/yeukfei02/stolenBike.svg?branch=master)](https://travis-ci.com/yeukfei02/stolenBike)
[![codecov](https://codecov.io/gh/yeukfei02/stolenBike/branch/master/graph/badge.svg)](https://codecov.io/gh/yeukfei02/stolenBike)

Help you to find stolen bike

url: <>

## Requirement

- install yarn
- install node (v14+)

## Testing and run

```zsh
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

## Docker

```zsh
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/stolenBike/blob/master/CONTRIBUTING.md)
