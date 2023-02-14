#!/usr/bin/env sh
set -e

echo "Start entrypoint.sh. Installing packages and running NestJS app..."

npm ci && npm run start:dev
