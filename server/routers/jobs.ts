import express, { Request, Response } from "express";

const Jobs = express.Router();

/**
 * @swagger
 * /jobs:
 *   get:
 *     tags: [
 *       Jobs
 *     ]
 *     summary: Returns an array of jobs for a board
 *     parameters:
 *       - name: boardId
 *         in: query
 *         type: integer
 *         description: The ID of the requested board.
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[ {"id": 123,"title": "aTitle","description": "aDescription"},{"id": 126,"title": "aTitle2","description": "aDescription2"} ]'
 *       204:
 *         description: No content
 */
Jobs.get("/", (req: Request, res: Response) => {
  const { name } = req.query;

  // example of using query for filtering
  // res.status(200).json({ name: `${name} helllo` });

  res.status(200);
});

export { Jobs };
