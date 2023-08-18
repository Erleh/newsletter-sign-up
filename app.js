const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const hostname = '127.0.0.1';
const port = 3000;

// To serve static files in a directory
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.post("/", (req, res) => {
    let data = req.body;

    // For the sake of simple javascript validation -- will definitely not catch all valid emails
    // would most likely need email confirmation for better validation
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/(^.*)@(.*)\.([a-z]{3})\b/);
    };

    if (validateEmail(req.body.email)){
        console.log("valid");
        res.sendFile(path.join(__dirname, '/public/success.html'));
    } else {
        console.log("Error");
    }

    console.log(req.body);
});

app.listen(port, hostname, () => {
    console.log(`Server running on port ${port}`);
});