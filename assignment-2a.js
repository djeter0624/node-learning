// imports
const express = require("express");
const app = express();
const axios = require("axios").default;

// create Employees and Projects to access the JSON files
const Employees = require("./employee.json");
const Projects = require("./project.json");

// retrieve data from JSON file using get
app.get("/employee/:id", (req, res)=>{
    const empID = req.params.id;
    for (let index = 0; index < Employees.length; index++) {
        const employee = Employees[index];
        if(employee.employeeid === parseInt(empID, 10))
            {
                // send response
                res.send(employee);
            }
    }
    // send response
    res.send({});
})

// retrieve data from JSON file using get
app.get("/project/:id", (req, res)=>{
    const projectID = req.params.id
    for (let index = 0; index < Projects.length; index++) {
        const project = Projects[index];
        if(project.projectid === parseInt(projectID, 10))
            {
                // send response
                res.send(project);
            }
    }
    // send response
    res.send({});
})

// retrieve data from 2 APIs above using get
app.get("/getemployeedetails/:id", (req, res)=>{
    const empID = req.params.id
    axios.get("http://localhost:3001/employee/" + empID)
    .then((response)=>{
        const employee = response.data
        // return a get to retrieve data from API
        return axios.get("http://localhost:3001/project/"+employee.project)
            .then((responseProject)=>{
                employee.project = responseProject.data;
                // return employees
                return employee
            })
    })
    .then((response)=>{
        // send response
        res.send(response);                
    })
    .catch((err)=>{
        console.log(err)
    });
});

// listen to port 3001
app.listen(3001)