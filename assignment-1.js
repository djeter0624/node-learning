// fs require
const fs = require("fs")

// prompt require
const prompt = require('prompt');

// set file function creates a new file and writes it to the titles.json file
function setFileName(name, callback) {
    // get file function called with filed parameters
    getFileNames((files) => {
        // writes a new file to the titles.json file
        fs.writeFile("./titles.json", JSON.stringify([...files, name]), (err, response) => {
            callback()
        })
    })
}

// get name function reads the titles.json file
function getFileNames(callback) {
    fs.readFile("./titles.json", "utf-8", (err, response) => {
        callback(JSON.parse(response))
    })
}

// prompt user function prompts the user to enter a file name
function promptUser() {
    prompt.get(['file'], function (err, result) {
        if (err) { return onErr(err); }
        try {
            getFileNames((allFiles) => {
                // check if the filename given by the user is in the JSON file
                if (allFiles.includes(result.file)) {
                    console.log("The file already exists");
                    promptUser();
                } else {
                    console.log('File created successfully.');
                    fs.writeFile(result.file, 'You are Awesome!!!', function (err) {
                        if (err) throw err;
                        setFileName(result.file, ()=>{})
                    })
                }
            })
        } 
        // catch error
        catch (err) {
            console.error(err);
        }
    });
}

// start the prompt
prompt.start();

// call the prompUser function
promptUser();