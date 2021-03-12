import "reflect-metadata";
import { json } from 'body-parser';
import express from 'express';
import router from './api/routes';
import {PORT, HOST, MONGO_USER, MONGO_PASSWORD, MONO_DB} from './config'
import mongoose from "mongoose";
import AppLogger from "./AppLogger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(json());

app.use(router);

AppLogger.init();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation for VehicleTypeManagement RestAPI',
    version: '1.0.0'
  },
  servers: [{
    url: ` http://${HOST}:${PORT}`,
    description: 'Development server'
  }]
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/api/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// todo: use data from vconfig
const uri: string = `mongodb+srv://admin:admin123!@cluster0.brt00.mongodb.net/VehicleManagement?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(client =>{
    app.listen(Number(PORT), HOST!, () =>{
        AppLogger.Info(`Server running on http://${HOST}:${PORT}.`);
      }
    )
  }
  )
  .catch(error => {
    AppLogger.Error("Connection to db failed.", error);
});