import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Users, Boards, Jobs, Auth } from "./routers";
import { verifyToken } from "./middleware/authenticate";
import { authorise } from "./middleware/authorise";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    baseUrl: "https://productivity-method.com/api/v1/",
    title: "Productivity API",
    version: "v1",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const openapiSpecification = swaggerJsdoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use("/swagger.json", (req, res) =>
  res.status(200).json(openapiSpecification)
);

app.all("*", verifyToken);
app.all("*", authorise);

app.use("/authenticate", Auth);
app.use("/users", Users);
app.use("/boards", Boards);
app.use("/jobs", Jobs);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
