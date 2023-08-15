import express from 'express';

let app = express();

const hostname = '127.0.0.1';
const port = 3000;

// To serve static files in a directory
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.post("/", (req, res) => {
    console.log(res);
});

app.listen(port, hostname, () => {
    console.log(`Server running on port ${port}`);
});