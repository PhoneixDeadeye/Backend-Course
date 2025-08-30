// The address of this server connected to the network is
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383

const express = require('express')
const app = express()
const PORT = 8383

let data = ['james']

// MIDDLEWARE
app.use(express.json()) // this middleware helps us to parse json data

// console.log('This is an extra line')

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)
// The method informs the nature of the request and then route is a further 
// subdirectory (basically we direct the request to the body of code to respond 
// appropriately, and these locations or routes are called endpoints)

// app.get('/', (req, res) => {
//     // this is endpoint number 1 - /
//     console.log('Hello World!', req.method)
//     res.sendStatus(201)
// })



// Type 1 - Website endpoints (these endpoints are for sending back html and 
// they typically come when a user enters a url in a browser)

app.get('/', (req, res) => {
    console.log('User requested the Home page website')
    res.send(`
        <body 
        style="background:pink;
        color: blue;">
            <h1>DATA:</h1>
            <a href="/dashboard">DASHBOARD</a>
            <p>${JSON.stringify(data)}</p>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
            <h1>Hello World! from DASHBOARD</h1>
            <a href="/">HOME</a>
        </body>
        `)
})

// Type 2 - API endpoints (these endpoints are for sending back JSON data) non visual

// CRUD-method  create-post read-get update-put and delete-delete 

app.get('/api/data', (req, res) => {
    console.log('This one was for data')
    res.status(203).send(data)
})

app.post('/api/data', (req, res) => {
    // someone wants to create a user (for example when they click a sign up 
    // button)
    // the user clicks the sign up button after entering their credentials, and 
    // their browser is wired up to send out a network request to the server to 
    // handle the action
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('Deleted the last entry')
    res.sendStatus(204)
})

app.listen(PORT, () => console.log(`Server has started on : ${PORT}`))