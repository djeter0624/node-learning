// require fs to write and read files
const fs = require('fs');

// // read data from file
// fs.readFile('./data/db.json', (err, result) => {
//     if(err)
//     {
//         throw err;
//     }
//     else
//     {
//         console.log(JSON.parse(result))
//     }
// });

// // write data to file
// fs.appendFile('./data/mytext.txt', 'My text read file \n', (err) =>{
//     if(err)
//     {
//         throw err;
//     }
//     else 
//     {
//         console.log('Data written successfully');
//     }
// });

// require express is a server
const express = require('express');

// create an express object and add a prot
const app = express();
const port = 6500;

// define default route  with express
app.get('/', (req, res) =>{
    res.send('<h1> Welcome to Express Server </h1>');
});

// Read file using express server
app.get('/getMovies', (req,res) => {
    fs.readFile('./data/db.json',(err,result) => {
        if(err)
        {
            throw err;
        }
        else
        {
            res.send(JSON.parse(result))
        }
    })
});

// create server to listen on port
app.listen(port,(err) =>{
    console.log('server is running on port ' + port);
});

