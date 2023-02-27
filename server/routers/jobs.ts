import express from "express";
import { validate } from "./../utils/validation";
import { body } from "express-validator";
import { getJobs, createJob, updateJob, deleteJob } from "./../controllers";

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
Jobs.get("/", getJobs);

/**
 * @swagger
 * /jobs:
 *   post:
 *     tags: [
 *       Jobs
 *     ]
 *     summary: Creates a new job
 *     parameters:
 *       - name: boardId
 *         in: query
 *         type: integer
 *         description: The ID of the requested board.
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeId:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *               title:
 *                 type: string
 *                 required: true
 *                 description: The job title
 *               description:
 *                 type: string
 *                 required: false
 *                 description: The job description
 *               status:
 *                 type: string
 *                 required: false
 *                 description: The job status
 *               completionDate:
 *                 type: string
 *                 required: false
 *                 description: The due date
 *                 example: 2023-01-20T00:00:00.000Z
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
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
    body("description").isString().trim(),
    body("completionDate").isString(),
  ],
  validate,
  createJob
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
 *         required: true
 *       - name: typeId
 *         in: query
 *         type: integer
 *         description: The ID of the job type.
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
 *               status:
 *                 type: string
 *                 required: false
 *                 description: The job status
 *               completionDate:
 *                 type: string
 *                 required: false
 *                 description: The due date
 *                 example: 2023-01-20T00:00:00.000Z
 *               typeId:
 *                 type: integer
 *                 description: The ID of the job type.
 *                 required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       200:
 *         description: OK
 */
Jobs.put(
  "/:jobId(\\d+)",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .withMessage("job title should have minimum length of 3")
      .trim(),
    body("description").isString().trim(),
    body("completionDate").isString(),
  ],
  validate,
  updateJob
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
 *       204:
 *         description: Job Deleted
 */
Jobs.delete("/:jobId(\\d+)", deleteJob);

export { Jobs };
