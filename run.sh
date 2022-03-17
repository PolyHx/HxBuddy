#!/bin/sh

set -x

# run only server
if [ "$1" = "server" ]; then
  cd packages/server && cargo watch -x run
else
  yarn $@ &
  cd packages/server && cargo watch -x run
fi

