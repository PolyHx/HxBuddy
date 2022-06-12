#!/bin/sh

set -x

# run only server
if [ "$1" = "server" ]; then
  cargo watch -x run
else
  yarn $@ &
  cargo watch -x run
fi

