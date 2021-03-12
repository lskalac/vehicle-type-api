import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import validateBody from "../midllewares/validateBody";
import UserLogin from "../rest-models/UserLogin";
import UserRegister from "../rest-models/UserRegister";

const userRouter = Router();

const userController = container.resolve(UserController);

userRouter.post("/register", validateBody(UserRegister), userController.RegisterAsync);
userRouter.put("/login", validateBody(UserLogin), userController.LoginAsync);

export default userRouter;

/**
 * @swagger
 * components:
 *  schemas:
 *      UserRegister:
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *      UserLogin:
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string            
 */

/**
 * @swagger
 * 
 * /users/register:
 *  post:
 *      summary: Creates a new user.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserRegister'
 *      responses:
 *          200:    
 *              description: Created user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          description: User token.
 *          400:
 *              description: Model validation failed.
 *          409:
 *              description: Username already used.
 *          500:
 *              description: Server error.
 *      tags:
 *          - users
 * 
 * /users/login:
 *  put:
 *      summary: Log a user to application.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *      responses:
 *          200:
 *              description: Logged user.
 *          401:
 *              description: Incorrect password.
 *          404:
 *              description: User not found.
 *      tags:
 *          - users
 */