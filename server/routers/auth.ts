import express from "express";
import { validate } from "../utils/validation";
import { check } from "express-validator";
import { authenticate, refresh } from "./../controllers";

const Authenticate = express.Router();

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
 *         content:
 *           application/json:
 *       204:
 *         description: No content
 */
Authenticate.route("/refresh").get(refresh);

/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags: [
 *       Authenticate
 *     ]
 *     summary: Returns all boards for a user
 *     parameters:
 *       - name: email
 *         in: body
 *         type: integer
 *         description: The ID of the requested user.
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *       204:
 *         description: No content
 */
Authenticate.route("/").post(
  [
    check("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15"),
  ],
  validate,
  authenticate
);
