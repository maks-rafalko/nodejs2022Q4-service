#!/usr/bin/env sh
set -e

echo "Start entrypoint.sh. Installing packages..."

npm install;

echo "Executing migrations...";

npm run typeorm migration:run -- --dataSource=src/data-source.ts

echo "Running NestJS app...";

npm run start:dev
