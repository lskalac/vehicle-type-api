import { Router } from "express";
import { container } from "tsyringe";
import { VehicleController } from "../controllers/VehicleController";
import auth from "../midllewares/auth";
import validateBody from "../midllewares/validateBody";
import { VehicleRest } from "../rest-models/VehicleRest";

const vehicleController = container.resolve(VehicleController);

const vehicleRouter = Router();

vehicleRouter.get("", vehicleController.FindAsync);
vehicleRouter.get("/:id", vehicleController.GetByAsync);
vehicleRouter.post("", auth(), validateBody(VehicleRest), vehicleController.PostAsync);
vehicleRouter.delete("/:id", auth(), vehicleController.DeleteAsync);

export default vehicleRouter;

/**
 * @swagger
 * components:
 *  schemas:
 *      VehicleCreate:
 *          properties:
 *              make:
 *                  type: string
 *              model:
 *                  type: string
 *              year:
 *                  type: number
 *      Vehicle:
 *          properties:
 *              id:
 *                  type: string
 *              make:
 *                  type: string
 *              model:
 *                  type: string
 *              year:
 *                  type: number
 */

/**
 * @swagger
 * 
 * /vehicles:
 *  get:
 *      summary: Retrieves list of vehicle types.
 *      responses:
 *          200:
 *              description: List of vehicle types.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Vehicle'
 *      tags:
 *          - vehicles
 *  post:
 *      summary: Creates a new vehicle type.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/VehicleCreate'
 *      responses:
 *          200:
 *              description: Created vehicle type.
 *          400:
 *              description: Model validation failed.
 *          409:
 *              description: Vehicle type already exists.
 *          500:
 *              description: Server error.
 *      tags:
 *          - vehicles
 * 
 * /vehicles/{id}:
 *  parameters:
 *      - in: path
 *        name: id
 *        type: string
 *  get:
 *      summary: Retrieve a vehicle type by given identifier.
 *      responses:
 *          200:
 *              description: List of vehicle types.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Vehicle'
 *          404:
 *              description: Vehicle type not found.
 *      tags:
 *          - vehicles
 *  delete:
 *      summary: Removes a vehicle type by given identifier.
 *      responses:
 *          200:
 *              description: Removed vehicle type.
 *          401:
 *              description: Unauthorized user.
 *          404: 
 *              description: Vehicle type not found.
 *          500:
 *              description: Server error.
 *      tags:
 *          - vehicles
 */