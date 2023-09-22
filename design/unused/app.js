const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.port || 3000;

// To serve static files in a directory
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.post("/", (req, res) => {
    let data = req.body;

    // This is not actual validation of email -- just making sure there is input here
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