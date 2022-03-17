#!/bin/sh

set -x

yarn $@ &
cd packages/server && cargo run
