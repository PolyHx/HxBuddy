#!/bin/sh

set -x

# run only server
if [ "$1" = "server" ]; then
  cargo watch -w packages/server -x run
else
  yarn $@ &
  cargo watch -w packages/server -x run
fi

