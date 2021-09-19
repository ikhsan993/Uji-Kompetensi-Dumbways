
const express = require ('express');
const router = express.Router();
const dbConnection = require('../connection/db');
router.get ('/', function (request, response){ 
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
router.get ('/prov/:id', function (request, response){ 
    const id = request.params.id;
    const title = 'Kabupaten';
    const query = `select * from kabupaten where provinsi_id = ${id} ;`
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
router.get ('/add',function (request, response){
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
router.get ('/detail/:id', function (request, response){
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
router.post ('/add', function (request, response){

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

router.get ('/edit/:id', function (request, response){
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

router.post ('/edit', function (request, response){
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

router.get('/delete/:id', function (request, response) {
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


module.exports = router;