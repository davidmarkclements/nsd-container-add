# nsd-container-create

Make sure nsd is up and running
```
nsd server start
```

If you're on Mac OS X make sure boot2docker is up, and
DOCKER_HOST is exported

```
boot2docker up
export DOCKER_HOST=tcp://192.168.59.103:2375
```

If docker isn't available, nsd-container-create will
still function, but at reduce capabilities.


```
nsd-container-create <sys>
```

Follow the interactive prompts

```
nsd container list <sys>
```

