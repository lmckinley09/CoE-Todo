import express from "express";
import { validate } from "./../utils/validation";
import { body } from "express-validator";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers";

const Users = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       Users
 *     ]
 *     summary: Returns an array of user items
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"id": 1, "email": "lorna@email.com", "first_name": "Lorna", "last_name": "McKinley"},
 *                            {"id": 2, "email": "jane@email.com", "first_name": "Jane", "last_name": "McKinley"}]'
 *       204:
 *         description: No content
 */
Users.get("/", getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [
 *       Users
 *     ]
 *     summary: Returns a single user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{"id": 1, "email": "lorna@email.com", "first_name": "Lorna", "last_name": "McKinley", "profile_picture": "default_profile.png", "created": "2022-12-12 14:29:20.012024", "last_modified": "2022-12-12 14:29:20.012024"}'
 *       204:
 *         description: No content
 */
Users.route("/:userId(\\d+)").get(getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       Users
 *     ]
 *     summary: Creates a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *                 example: example@email.com
 *               first_name:
 *                 type: string
 *                 required: true
 *                 description: The first name for the user
 *               last_name:
 *                 type: string
 *                 required: true
 *                 description: The last name for the user
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *                 example: password!1
 *               profile_picture:
 *                 type: string
 *                 required: false
 *                 description: The profile picture for the user
 *                 example: default_profile.png
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: User Created
 */
Users.post(
  "/",
  [
    body("email").isString().isLength({ min: 3 }).isEmail().normalizeEmail(),
    body("first_name").isString().isLength({ min: 2 }).trim(),
    body("last_name").isString().isLength({ min: 2 }).trim(),
    body("password")
      .isString()
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one special character"),
  ],
  validate,
  createUser
);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [
 *       Users
 *     ]
 *     summary: Updates an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The id of the requested user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: false
 *                 description: The email for the user
 *                 example: example@email.com
 *               first_name:
 *                 type: string
 *                 required: false
 *                 description: The first name for the user
 *               last_name:
 *                 type: string
 *                 required: false
 *                 description: The last name for the user
 *               password:
 *                 type: string
 *                 required: false
 *                 description: The password for the user
 *                 example: password!1
 *               profile_picture:
 *                 type: string
 *                 required: false
 *                 description: The profile picture for the user
 *                 example: default_profile.png
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: User Updated
 */
Users.put(
  "/:userId(\\d+)",
  [
    body("email").isString().isLength({ min: 3 }).isEmail().trim(),
    body("first_name").isString().isLength({ min: 2 }).trim(),
    body("last_name").isString().isLength({ min: 2 }).trim(),
  ],
  validate,
  updateUser
);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [
 *       Users
 *     ]
 *     summary: Deletes an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Deleted
 */
Users.delete("/:userId(\\d+)", deleteUser);

export { Users };
