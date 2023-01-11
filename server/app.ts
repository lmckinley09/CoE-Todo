import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Users } from "./routers";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    baseUrl: "https://productivity-method.com/api/v1/",
    title: "Productivity API",
    version: "v1",
  },
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use("/swagger.json", (req, res) =>
  res.status(200).json(openapiSpecification)
);

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.use("/users", Users);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
