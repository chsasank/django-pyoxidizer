# django-pyoxidizer

PyOxidizer to package a django app


## How to run:

Install pyoxidizer:

```
$ python3 -m pip install pyoxidizer
```

build your app 

```
$ pyoxidizer build
```

Run your app from build. The path below might change based on platform

```
$ ./build/x86_64-unknown-linux-gnu/debug/install/pyapp runserver
```

Now you should be able to open localhost:8000 and see django server running.


## Build Electron

```
$ cp -r build electron/extraResources
$ cd electron
$ npm run make
```

You'll have our installers in `electron/out/`.