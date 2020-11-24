//import http from 'http';
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {getCollectionDocuments, createCollectionDocument, deleteCollectionDocument} = require('./database.js');



//create our express api
const app = express();

app.use(cors());
app.use(bodyParser.json())


//store the users in array for now, it should be mongo DB

    //listen for request to the endpoint /something and return with a message
    app.get('/', async (request, response) => {
        //read from our users array
        const courses = await getCollectionDocuments('data');
        response.send(courses)
})

    //create a POST endpoint
    app.post('/create', async (request, response) => {
        const newCourse = request.body
        console.log(request.body)
        await createCollectionDocument('data' , newCourse)
        //save it to the database
        response.send({name:"we created this user"})
    })

    //create a delete endpoint
    app.delete('/delete', async (request, response) => {
        //i need to delete my user from the array
        const CourseToDelete = request.body
        //take out the user we are trying to delete
        await deleteCollectionDocument('data', CourseToDelete)

        response.send({name: 'we deleted this user'})
    })


    //listen on port 8090
    app.listen(8090);


// // this is going to be our node api using vanilla JS :)
// const server = http.createServer( (request, response) => {
    
    
//     //challenge: return a different responses based on what the urls is in the request
//     if (request.url == '/something') {        
//         // we need to send something in the response
//         response.end('hello from my node api i just created :) ')
//     } else {
//         response.end('hello from my catch all endpoints ')
//     };   
// })
// //give the server a port to listen on
// server.listen(8090);