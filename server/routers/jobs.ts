import express, { Request, Response } from "express";
import { validate } from "./../utils/validation";
import { body } from "express-validator";

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
 *                 value: '[ {"id": 123,"title": "aTitle","description": "aDescription",type: "tick"},{"id": 126,"title": "aTitle2","description": "aDescription2",type: "tick"} ]'
 *       204:
 *         description: No content
 */
Jobs.get("/", (req: Request, res: Response) => {
  const { boardId } = req.query;

  res.status(200).json([
    {
      id: 123,
      title: "aTitle",
      description: "aDescription",
      type: "tick",
    },
    {
      id: 126,
      title: "aTitle2",
      description: "aDescription2",
      type: "tick",
    },
    {
      id: 124,
      title: "aTitle3",
      description: "aDescription3",
      type: "task",
    },
  ]);
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
Jobs.post(
  "/",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("job title should have minimum length of 3")
      .trim(),
    body("description")
      .isString()
      .isLength({ min: 3 })
      .withMessage("description should have minimum length of 3")
      .trim(),
    body("completion_date").isString(),
    body("type").isString().isLength({ min: 4 }).trim(),
    body("project").isNumeric(),
  ],
  validate,
  (req: Request, res: Response) => {
    res.sendStatus(201);
  }
);

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
Jobs.put(
  "/:boardId(\\d+)",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("board name should have minimum length of 3")
      .trim(),
    body("description")
      .isString()
      .isLength({ min: 3 })
      .withMessage("description should have minimum length of 3")
      .trim(),
    body("completion_date").isString(),
    body("type").isString().isLength({ min: 4 }).trim(),
    body("project").isNumeric(),
  ],
  validate,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

/**
 * @swagger
 * /jobs/{jobId}:
 *   delete:
 *     tags: [
 *       Jobs
 *     ]
 *     summary: Deletes an existing job
 *     parameters:
 *       - name: jobId
 *         in: path
 *         type: integer
 *         description: The ID of the requested job.
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Job Deleted
 */
Jobs.delete("/:jobId(\\d+)", (req: Request, res: Response) => {
  const { jobId } = req.params;
  console.log(`${jobId} deleted`);
});

export { Jobs };
