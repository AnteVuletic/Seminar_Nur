const express = require('express')
const sql = require('msnodesqlv8')
const bodyParser = require('body-parser')

const RestApi = express()
let expressRouter = express.Router()

const connectionString = "Driver={SQL Server};Server=localhost\\SQLExpress;Database=InformacijskaOprema;Integrated Security=true;MultipleActiveResultSets=true;"

RestApi.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
RestApi.use(bodyParser.json())  
expressRouter.get('/api/all/:table',(req,res)=>{
    sql.query(connectionString,`SELECT * FROM ${req.params.table}`,(err,rows) =>{
        if(err != null)
            res.send(JSON.stringify(err))
        else
            res.send(JSON.stringify(rows))
        })       
})
expressRouter.post('/api/add/user',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Korisnik] ( Oib , Ime , Prezime ) Values(\'${req.body.Oib}\', \'${req.body.Ime}\', \'${req.body.Prezime}\')`)
    res.send(result);
})
expressRouter.post('/api/add/model',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Model] ( Model , Marka ) Values(\'${req.body.Model}\', \'${req.body.Marka}\')`)
    res.send(result);
})
expressRouter.post('/api/add/prostorija',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Prostorija] ( Adresa ) Values(\'${req.body.Adresa}\')`)
    res.send(result);
})
expressRouter.post('/api/add/software',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Software] ( OS , Licenca ) Values(\'${req.body.Os}\', \'${req.body.Licenca}\')`)
    res.send(result)
})

expressRouter.post('/api/add/hardware',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Hardware] ( KorisnikId , ProstorijaId , Model ) Values(\'${parseInt(req.body.KorisnikId)}\', \'${parseInt(req.body.ProstorijaId)}\', \'${Object.values(req.body.Model)}\')`)
    res.send(result)
})
expressRouter.post('/api/add/relation',(req,res)=>{
    const result = sql.query(connectionString,`INSERT INTO [dbo].[Software_Hardware] ( SoftwareId , HardwareId , Azurirano , Namjena ) Values(\'${parseInt(req.body.SoftwareId)}\', \'${parseInt(req.body.HardwareId)}\', \'${req.body.Azurirano*1}\', \'${req.body.Namjena}\')`)
    res.send(result)
})
RestApi.use('/',expressRouter);

RestApi.listen(3001)