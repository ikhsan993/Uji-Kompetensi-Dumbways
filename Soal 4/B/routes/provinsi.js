const express = require ('express');
const router = express.Router();
const dbConnection = require('../connection/db');
router.get ('/', function (request, response){ 
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
router.get ('/detail/:id', function (request, response){
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
router.get ('/add',function (request, response){
    const title = 'Tambah Data Provinsi';
    response.render('addprov',{
        title,
    });
});
// add data provinsi
router.post ('/add', function (request, response){

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


router.get('/delete/:id', function (request, response) {
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
router.get ('/edit/:id', function (request, response){
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
router.post ('/edit', function (request, response){
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


module.exports = router;