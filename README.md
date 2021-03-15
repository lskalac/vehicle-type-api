# vehicle-type-api

Backend part of VehicleType project written in Node + Express + MongoDb.
Documentation can be found in localhost:3030/docs.

Steps to run: npm install + npm start

Class validator + class transform is used for validating request query and body.
Winston for logging errors.
Jwt is user for signing user and bcrypt for crypitng password.

Project is separated in two layers: api + service. Since project is small, repository layer is skipped.
