import express, { Request, Response } from "express";

const Boards = express.Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Returns all boards for a user
 *     parameters:
 *       - name: userId
 *         in: query
 *         type: integer
 *         description: The ID of the requested user.
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{"id": 100, "name": "Lornas Board", "last_modified": "2022-11-12 14:29:20.012024"},
 *                              {"id": 101, "name": "Christmas Board", "last_modified": "2022-11-12 14:29:20.012026"}]'
 *       204:
 *         description: No content
 */
Boards.route("/user/:userId(\\d+)").get((req: Request, res: Response) => {
  const { userId } = req.params;
  res.status(200).json({ name: `lorna's ${userId}` });
});

/**
 * @swagger
 * /boards/{boardId}:
 *   get:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Returns a board by Board ID
 *     parameters:
 *       - name: boardId
 *         in: path
 *         type: integer
 *         description: The ID of the requested board.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "board": {"id": 5, "name": "Lornas Board", "owner_id": 1 "created": "2022-12-12 14:29:20.012024", "last_modified": "2022-11-12 14:29:20.012024",
 *                           "ticks": [{"id": 123,"title": "aTitle","description": "aDescription"},{"id": 126,"title": "aTitle2","description": "aDescription2"}],
 *                           "tasks": [{"id": 124,"title": "aTitle3","description": "aDescription3"}],
 *                           "projects": [{"id": 125,"title": "aTitle4","description": "aDescription4"}] } }'
 *       204:
 *         description: No content
 */
Boards.route("/:boardId(\\d+)").get((req: Request, res: Response) => {
  const { boardId } = req.params;
  res.status(200).json({ name: `lorna's ${boardId}` });
});

/**
 * @swagger
 * /boards:
 *   post:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Creates a new board
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name of the board
 *               user:
 *                 type: number
 *                 required: true
 *                 description: The user creating the board
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Board Created
 */
Boards.post("/", (req: Request, res: Response) => {
  res.sendStatus(201);
});

/**
 * @swagger
 * /boards/{boardId}:
 *   patch:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Updates a board
 *     parameters:
 *       - name: boardId
 *         in: path
 *         type: integer
 *         description: The ID of the board.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: The name of the board
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: OK
 */
Boards.post("/:boardId(\\d+)", (req: Request, res: Response) => {
  res.sendStatus(201);
});

/**
 * @swagger
 * /boards/{boardId}:
 *   delete:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Deletes an existing board
 *     parameters:
 *       - name: boardId
 *         in: path
 *         type: integer
 *         description: The ID of the requested board.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Board Deleted
 */
Boards.delete("/:boardId(\\d+)", (req: Request, res: Response) => {
  const { boardId } = req.params;
  console.log(`${boardId} deleted`);
});

export { Boards };
