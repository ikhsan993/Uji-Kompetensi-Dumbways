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
app.get ('/provdetail/:id', function (request, response){
    const id = request.params.id;
    const title = 'Rent my ';
    const query = `select * from provinsi where id = ${id}`;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             

           response.render(`provdetail`,{
            id :results[0].id,
            title : title,
            data : results,
        });
        conn.release();
            });
        });
});

// Provinsi
app.get ('/addprov',function (request, response){
    const title = 'Tambah Data Provinsi';
    response.render('addprov',{
        title,
    });
});
// add data provinsi
app.post ('/addprov', function (request, response){

    let {nama,resmi,photo,pulau} = request.body;
    
  const query = `insert into provinsi (nama,diresmikan,photo,pulau) values ("${nama}","${resmi}","${photo}","${pulau}");`;
  dbConnection.getConnection(function(err, conn){
    if (err)  throw err;
        conn.query(query,function(err,results){
         if (err) throw err;
         
            response.redirect('/');
        });
        conn.release();
    });
  
});

// Kabupaten
app.get ('/kabupaten', function (request, response){ 
    const title = 'Kabupaten';
    const query = 'select * from kabupaten order by id desc;'
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             

           response.render('kabupaten',{
            title : title,
            data : results,
        });
        conn.release();
            });
        });
    
});

app.get ('/addkab',function (request, response){
    const title = 'Tambah Data Kabupaten'
    const query = 'select * from provinsi';
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
           console.log(results);
            response.render('addkab',{
                title : title,
                data : results,
            });
        });
            conn.release();
        }); 
});
app.get ('/kabdetail/:id', function (request, response){
    const id = request.params.id;
    const title = 'Rent my ';
    const query = `select kabupaten.id as id,kabupaten.name as name,kabupaten.diresmikan as diresmikan,kabupaten.photo as photo,provinsi.nama as prov_name
    from kabupaten left join provinsi on provinsi.id = kabupaten.provinsi_id where kabupaten.id =${id}`;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
                console.log(results);
           response.render(`kabdetail`,{
            id :results[0].id,
            title : title,
            data : results,
        });
        conn.release();
            });
        });
});

// add data provinsi
app.post ('/addkab', function (request, response){

    let {nama,resmi,photo,provinsi} = request.body;
    
  const query = `insert into kabupaten (name,diresmikan,photo,provinsi_id) values ("${nama}","${resmi}","${photo}","${provinsi}");`;
  dbConnection.getConnection(function(err, conn){
    if (err)  throw err;
        conn.query(query,function(err,results){
         if (err) throw err;
         
            response.redirect('/kabupaten');
        });
        conn.release();
    });
  
});
app.get ('/editprov/:id', function (request, response){
    const id = request.params.id;
    const title = 'Edit Data Provinsi ';
    const query = `select * from provinsi where id = ${id}`;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
console.log(results);
           response.render(`editprov`,{
            id :results[0].id,
            title : title,
            data : results,
        });
        conn.release();
            });
        });
    
});
app.post ('/editprov', function (request, response){
    let {name,diresmikan,photo,pulau} = request.body;
    let id = request.body.id;
    console.log(id);
    const query = `update provinsi set nama= '${name}', diresmikan ='${diresmikan}', photo = '${photo}', pulau = '${pulau}' where id = ${id} `;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
            if (err) throw err;
                response.redirect('/');
            });
            conn.release();
        });
  
});

app.get ('/editkab/:id', function (request, response){
    const id = request.params.id;
    const title = 'Edit Data Kabupaten ';
    const query = `select kabupaten.id as id,kabupaten.name as name,kabupaten.diresmikan as diresmikan,kabupaten.photo as photo,provinsi.id as prov_id, provinsi.nama as prov_name
    from kabupaten left join provinsi on provinsi.id = kabupaten.provinsi_id where kabupaten.id =${id} `;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
console.log(results);
           response.render(`editkab`,{
            id :results[0].id,
            title : title,
            data : results,
        });
        conn.release();
            });
        });
    
});
app.post ('/editkab', function (request, response){
    let {name,diresmikan,photo,provinsi} = request.body;
    let id = request.body.id;
    console.log(id);
    const query = `update kabupaten set name= '${name}', diresmikan ='${diresmikan}', photo = '${photo}', provinsi_id = '${provinsi}' where id = ${id} `;
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
            if (err) throw err;
                response.redirect('/kabupaten');
            });
            conn.release();
        });
  
});


app.get('/deleteprov/:id', function (request, response) {
    const id = request.params.id;
    console.log(id);
    const query = `delete from provinsi where id = ${id}`
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
           console.log(results);
           response.redirect('/');
            });
            conn.release();
        });
});
app.get('/deletekab/:id', function (request, response) {
    const id = request.params.id;
    console.log(id);
    const query = `delete from kabupaten where id = ${id}`
    dbConnection.getConnection(function(err, conn){
        if (err)  throw err;
            conn.query(query,function(err,results){
             if (err) throw err;             
           console.log(results);
           response.redirect('/kabupaten');
            });
            conn.release();
        });
});

// create localhost:3000 server
const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug('Server Port 3000 is Online');
