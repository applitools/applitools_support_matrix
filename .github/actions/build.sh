#!/bin/bash

for d in *; do
 echo $d
 if [ -d $d ]; then
      pushd $d
      [ -f package.json ] && npm install && npm run build
      popd
 fi
done