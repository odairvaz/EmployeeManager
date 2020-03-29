const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const { mongoose } = require("./db.js");
var employeeController = require("./controllers/employeeController.js");

var app = express();
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Employee Manager",
      description: "A app to manage employees in a company",
      contact: {
        name: "Odair VAZ, Alexandre GEUFFRARD, Alexandre CRUZ"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["index.js", "controllers/employeeController.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({ origin: "http://localhost:4200" }));

app.listen(3000, () => console.log("Server started at port : 3000"));

app.use("/employees", employeeController);
