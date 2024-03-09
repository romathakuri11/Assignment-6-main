/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Shahman Iqbal  Student ID: msiqbal3  Date: 08-03-2024
*
*  Online (Cycliic) Link: https://amaranth-moth-gown.cyclic.app
*
********************************************************************************/ 


const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Initialize collegeData
collegeData.initialize()
  .then(() => {
    // Routes
    app.get("/students", (req, res) => {
     collegeData.getAllStudents()
     .then(students => res.json(students))
     .catch(() => res.json({message: "no results"}))
      
    });

    app.get("/tas", (req, res) => {
      collegeData.getTAs()
        .then(tas => res.json(tas))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/courses", (req, res) => {
      collegeData.getCourses()
        .then(courses => res.json(courses))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/student/:num", (req, res) => {
      const num = req.params.num;
      collegeData.getStudentByNum(num)
        .then(student => res.json(student))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/home.html"));
    });

    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/about.html"));
    });

    app.get("/htmlDemo", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
    });

    app.get("/students/add", (req, res) => {
        res.sendFile(path.join(__dirname,"/views/addStudent.html"));
    });
    
    app.post("/students/add", (req,res) => {
        collegeData.addStudent(req.body).then(success=>{
            res.redirect("/students")
        }).catch(error=>{
                res.send(JSON.stringify({message:"No Results"}))
        })
      });
    

    app.use((req, res) => {
      res.status(404).send("Page Not Found");
    });

    // Start the server
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch(err => {
    console.error("Error initializing collegeData:", err);
  });

