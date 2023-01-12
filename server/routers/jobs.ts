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

/**
 * @swagger
 * /jobs:
 *   post:
 *     tags: [
 *       Jobs
 *     ]
 *     summary: Creates a new job
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId:
 *                 type: number
 *                 required: true
 *                 description: The ID of the board
 *               title:
 *                 type: string
 *                 required: true
 *                 description: The job title
 *               description:
 *                 type: string
 *                 required: false
 *                 description: The job description
 *               completion_date:
 *                 type: string
 *                 required: false
 *                 description: The due date
 *               type:
 *                 type: string
 *                 required: true
 *                 description: The type of job
 *               project:
 *                 type: number
 *                 required: false
 *                 description: The project the task falls under
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Job Created
 */
Jobs.post("/", (req: Request, res: Response) => {
  res.sendStatus(201);
});

/**
 * @swagger
 * /jobs/{jobId}:
 *   put:
 *     tags: [
 *       Jobs
 *     ]
 *     summary: Updates a job
 *     parameters:
 *       - name: jobId
 *         in: path
 *         type: integer
 *         description: The ID of the job.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *                 description: The title of the job
 *               description:
 *                 type: string
 *                 required: false
 *                 description: The job description
 *               completion_date:
 *                 type: string
 *                 required: false
 *                 description: The due date
 *               type:
 *                 type: string
 *                 required: true
 *                 description: The type of job
 *               project:
 *                 type: number
 *                 required: false
 *                 description: The project the task falls under
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: OK
 */
Jobs.put("/:boardId(\\d+)", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { Jobs };
