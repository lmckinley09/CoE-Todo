import express, { Request, Response } from "express";

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
 *                 value: '[{"id": 1, "email_address": "lorna@email.com", "first_name": "Lorna", "last_name": "McKinley", "date_of_birth": "1996-09-26", "created": "2022-12-12 14:29:20.012024", "last_modified": "2022-12-12 14:29:20.012024"},
 *                            {"id": 2, "email_address": "jane@email.com", "first_name": "Jane", "last_name": "McKinley", "date_of_birth": "1986-11-26", "created": "2022-12-12 14:29:20.012025", "last_modified": "2022-12-12 14:29:20.012025"}]'
 *       204:
 *         description: No content
 */
Users.get("/", (req: Request, res: Response) => {
  const { name } = req.query;

  // example of using query for filtering
  // res.status(200).json({ name: `${name} helllo` });

  res.status(200).json([
    {
      id: 1,
      email_address: "lorna@email.com",
      first_name: "Lorna",
      last_name: "McKinley",
      date_of_birth: "1996-09-26",
      created: "2022-12-12 14:29:20.012024",
      last_modified: "2022-12-12 14:29:20.012024",
    },
    {
      id: 2,
      email_address: "jane@email.com",
      first_name: "Jane",
      last_name: "McKinley",
      date_of_birth: "1986-11-26",
      created: "2022-12-12 14:29:20.012025",
      last_modified: "2022-12-12 14:29:20.012025",
    },
  ]);
});

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
 *                 value: '{"id": 1, "email_address": "lorna@email.com", "first_name": "Lorna", "last_name": "McKinley", "date_of_birth": "1996-09-26", "created": "2022-12-12 14:29:20.012024", "last_modified": "2022-12-12 14:29:20.012024"}'
 *       204:
 *         description: No content
 */
Users.route("/:userId(\\d+)").get((req: Request, res: Response) => {
  const { userId } = req.params;
  res.status(200).json({ name: `lorna ${userId}` });
});

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
 *               email_address:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
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
 *               date_of_birth:
 *                 type: string
 *                 required: true
 *                 description: The date of birth for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: User Created
 */
Users.post("/", (req: Request, res: Response) => {
  const { email_address, first_name, last_name, date_of_birth } = req.body;
  console.log(
    "email:",
    email_address,
    "firstname:",
    first_name,
    "lastname:",
    last_name,
    "dob:",
    date_of_birth
  );
  res.sendStatus(201);
});

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     tags: [
 *       Users
 *     ]
 *     summary: Updates an existing user
 *     parameters:
 *       - name: userId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_address:
 *                 type: string
 *                 required: false
 *                 description: The email for the user
 *               first_name:
 *                 type: string
 *                 required: false
 *                 description: The first name for the user
 *               last_name:
 *                 type: string
 *                 required: false
 *                 description: The last name for the user
 *               date_of_birth:
 *                 type: string
 *                 required: false
 *                 description: The date of birth for the user
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       204:
 *         description: User Updated
 */
Users.patch("/:userId(\\d+)", (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email_address, first_name, last_name, date_of_birth } = req.body;
  console.log(
    "id:",
    userId,
    "email:",
    email_address,
    "firstname:",
    first_name,
    "lastname:",
    last_name,
    "dob:",
    date_of_birth
  );
  res
    .status(200)
    .json({ name: `lorna ${userId} updated`, email: `${email_address}` });
});

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
 *       201:
 *         description: User Deleted
 */
Users.delete("/:userId(\\d+)", (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(`${userId} deleted`);
});

export { Users };
