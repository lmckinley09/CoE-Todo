import express from "express";
import { validate } from "../utils/validation";
import { check } from "express-validator";
import { authenticate, refresh } from "./../controllers";

const Auth = express.Router();

/**
 * @swagger
 * /authenticate/refresh:
 *   get:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: if validated return token
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error
 */
Auth.route("/refresh").get(refresh);

/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: Authenticate user
 *     requestBody:
 *         description: JSON object used for auethentication
 *         content:
 *          application/json:
 *                schema:
 *                  type: object
 *                  required:
 *                    - email
 *                    - password
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: admin@email.com
 *                      password:
 *                          type: string
 *                          example: password1!
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Error
 */
Auth.route("/").post(
  [
    check("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15"),
  ],
  validate,
  authenticate
);

export { Auth };
