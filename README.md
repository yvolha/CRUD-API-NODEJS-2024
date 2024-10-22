# CRUD-API-NODEJS-2024

**Node version**: v22.9.0

**Development branch**: crud-api

**Scripts**:
* Starting the app in development mode
"start:dev": "npx nodemon",

* Building the app and starting the app in production mode
"start:prod": "tsc && node dist/src/index.js"

* Starting the app in development mode using Cluster
"start:multi": "npx nodemon -- --cluster",