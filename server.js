const express = require('express');
const { engine } = require('express-handlebars');

// Start express
let app = express();

// Prep folder for serving static files
app.use(express.static('./public'));

// Enable middleware to parse content-type json and urlencoded
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Sets extension of handlebars to run the callback of handlebars engine
app.engine('handlebars', engine({
    layoutsDir: __dirname + '/views/layouts'
}));
// Sets the template engine to use handlebars
app.set('view engine', 'handlebars');
// Sets views directory
app.set('views', './views');

// Get main page
app.get('/', (req, res) => {
    // Renders view using handlebars via previous settings
    // rendering callto into main template
    res.render('callto', {
        failed: false
    });
});

// Post on main page
app.post('/', (req, res) => {
    // This is not actual validation of email -- just making sure there is input here
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/(^.*)@(.*)\.([a-z]{3})\b/);
    };

    if (validateEmail(req.body.email)){
        res.render('success', { 'email': req.body.email });
    } else {
        res.render('callto', {
            failed: true,
            invalid: "invalid"
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));