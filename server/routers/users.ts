import express, { Request, Response } from "express";

const Users = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
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
 *                 value: '[{ "id": 1, "name": "Some Items", "email": "SI" }, { "id": 2, "name": "More Items", "email": "test@test.com" }]'
 *       204:
 *         description: No content
 */
Users.get("/", (req: Request, res: Response) => {
  const { name } = req.query;

  res.status(200).json({ name: `${name} helllo` });
});

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     tags: [
 *       projects
 *     ]
 *     summary: Returns an single project.
 *     parameters:
 *       - name: projectId
 *         in: path
 *         type: integer
 *         description: The ID of the requested project.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1, "name": "Some Items", "key": "SI" }'
 *       204:
 *         description: No content
 */
Users.route("/:userId(\\d+)").get((req: Request, res: Response) => {
  const { userId } = req.params;
  res.status(200).json({ name: `lorna ${userId}` });
});

Users.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  console.log(name);
  res.sendStatus(201);
});

export { Users };
