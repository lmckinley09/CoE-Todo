import express, { Request, Response } from "express";

const Boards = express.Router();

/**
 * @swagger
 * /boards/user/{userId}:
 *   get:
 *     tags: [
 *       Boards
 *     ]
 *     summary: Returns a boards for a user
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
 *                 value: '[{"id": 5,"name": "Lorna's Board","last_modified": "2022-11-12 14:29:20.012024"}]'
 *       204:
 *         description: No content
 */
Boards.route("/:boardId(\\d+)").get((req: Request, res: Response) => {
  const { boardId } = req.params;
  res.status(200).json({ name: `lorna's ${boardId}` });
});

export { Boards };
