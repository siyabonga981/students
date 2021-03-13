const express = require("express");
var router = express.Router();
var studentId = require("mongoose").Types.ObjectId;

var { Student } = require("../models/student");

// get method for all students
router.get("/getStudents", (req, res) => {
  Student.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        `Error retrieving Students : ${JSON.stringify(err, undefined, 2)}`
      );
    }
  });
});

// get method for specific student
router.get("/getStudents/:id", (req, res) => {
  if (!studentId.isValid(req.params.id)) {
    return res.status(400).send(`No Student found for id : ${req.params.id} `);
  }
  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        `Error in retrieving Student : ${JSON.stringify(err, undefined, 2)}`
      );
    }
  });
});

// post method to add new student
router.post("/addNewStudent", (req, res) => {
  var newStudent = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    grade: req.body.grade,
    username: req.body.username,
    userPass: req.body.userPass,
  });
  newStudent.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        `Error in adding student : ${JSON.stringify(err, undefined, 2)}`
      );
    }
  });
});

// put method to update student
router.put("/updateStudent/:id", (req, res) => {
  if (!studentId.isValid(req.params.id)) {
    res.status(400).send(`No Student found for id : ${req.params.id}`);
  } else {
    var newStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      grade: req.body.grade,
      username: req.body.username,
      userPass: req.body.userPass
    };

    Student.findByIdAndUpdate(
      req.params.id,
      { $set: newStudent },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            `Error updating Student : ${JSON.stringify(err, undefined, 2)}`
          );
        }
      }
    );
  }
});

// delete method to remove student from database
router.delete("/deleteStudent/:id", (req, res) => {
  if (!studentId.isValid(req.params.id)) {
    res.status(400).send(`No Student with id : ${req.params.id}`);
  } else {
    Student.findByIdAndDelete(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          `Error in deleting Student : ${JSON.stringify(err, undefined, 2)}`
        );
      }
    });
  }
});

module.exports = router;
