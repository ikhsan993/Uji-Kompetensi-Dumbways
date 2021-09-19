// initializing 
const http = require('http');
const express = require ('express');
const path = require ('path');
const hbs = require ('hbs');
const app = express();
// use express js
app.use(express.json());
// to get data from client
app.use(express.urlencoded({ extended: false}));
// connecting to database
const dbConnection = require('./connection/db');

// set handlebars as view engine
app.set ('view engine','hbs');
// to use public path
app.use ('/public', express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname = 'views/partials');

const provinsiRoute = require('./routes/provinsi')
const kabupatenRoute = require('./routes/kabupaten')

app.use('/provinsi', provinsiRoute);
app.use('/kabupaten', kabupatenRoute);

app.get ('/', function (request, response){ 
    const title = 'Provinsi';
    const query = 'select * from provinsi order by id desc;'
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             

           response.render('index',{
            title : title,
            data : results,
        });
        conn.release();
            });
        });
    
});

// create localhost:3000 server
const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug('Server Port 3000 is Online');