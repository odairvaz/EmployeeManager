const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Employee } = require("../models/employee");

// => localhost:3000/employees/
/**
 * @swagger
 * /employees:
 *  get:
 *    description: Use to request all employee
 *    produces:
 *     - "application/json"
 *    parameters: []
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Employees :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

/**
 * @swagger
 * /employees/{employeeId}:
 *  get:
 *    description: Find an instance of employee by id from the data source.
 *    produces:
 *     - "application/json"
 *    parameters:
 *    - name: "employeeId"
 *      in: "path"
 *      description: "ID of employee to return"
 *      required: true
 *      type: "string"
 *    responses:
 *      '200':
 *        description: "A successful response"
 *      '400':
 *        description: "Invalid ID supplied"
 *      '404':
 *        description: "Employee not found"
 */
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Employee :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

/**
 * @swagger
 * /employees:
 *   post:
 *     description: "Create a new instance of the employee and persist it into the data source"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Employee object that needs to be added to the company"
 *       required: true
 *     responses:
 *       405:
 *         description: "Invalid input"
 *
 */
router.post("/", (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Employee Save :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

/**
 * @swagger
 * /employees/{employeeId}:
 *   put:
 *     description: "Replace an existing model instance of an employee and persist into the data source."
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Employee object that needs to be updated"
 *       required: true
 *     responses:
 *      '400':
 *        description: "Invalid ID supplied"
 *      '404':
 *        description: "Employee not found"
 *      '405':
 *        description: "Validation exception"
 */
router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  };
  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Employee Update :" + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

/**
 * @swagger
 * /employees/{employeeId}:
 *   delete:
 *     description: "Delete an instance of employee by id from the data source."
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "path"
 *       name: "employeeId"
 *       description: "Employee id to delete"
 *       type: "string"
 *       required: true
 *     responses:
 *      '400':
 *        description: "Invalid ID supplied"
 *      '404':
 *        description: "Employee not found"
 */
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Employee Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
