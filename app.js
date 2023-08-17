const express = require('express');
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

    // For the sake of simple javascript validation
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[a-z]+.*@.*\..{3}/);
    };

    if (validateEmail(req.body)){
        console.log("valid");
    } else {
        console.log("Error");
    }

    console.log(req.body);
});

app.listen(port, hostname, () => {
    console.log(`Server running on port ${port}`);
});