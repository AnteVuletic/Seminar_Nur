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
expressRouter.get('/api/sorted/Hardware',(req,res)=>{
    sql.query(connectionString,'SELECT * FROM [dbo].[Hardware] ORDER BY [dbo].[Hardware].[Model] ASC',(err,result)=>{
        if(err !=null)
            console.log(err)
        else
            res.send(JSON.stringify(result))
    })
})
expressRouter.get('/api/sorted/Software',(req,res)=>{
    sql.query(connectionString,'SELECT * FROM [dbo].[Software] ORDER BY [dbo].[Software].[OS] ASC',(err,result)=>{
        if(err !=null)
            console.log(err)
        else
            res.send(JSON.stringify(result))
    })
})
expressRouter.get('/api/sorted/prostorija',(req,res)=>{
    sql.query(connectionString,'SELECT p.Adresa,h.Model,s.OS FROM dbo.Prostorija p LEFT JOIN dbo.Hardware h ON p.ProstorijaId = h.ProstorijaId LEFT JOIN Software_Hardware sh ON h.HardwareId = sh.HardwareId LEFT JOIN Software s ON s.SoftwareId = sh.SoftwareId GROUP BY p.Adresa,h.Model,s.OS ORDER BY p.Adresa,h.Model,s.OS',(err,rows)=>{
        if(err !=null)
            console.log(err)
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

expressRouter.post('/api/edit/model',(req,res) =>{
    const result = sql.query(connectionString,`UPDATE [dbo].[Model] SET [dbo].[Model].[Model] = N\'${req.body[0].Model}\', [dbo].[Model].[Marka] = \'${req.body[0].Marka}\' WHERE [dbo].[Model].[Model] = \'${req.body[1].Model}\' AND [dbo].[Model].[Marka] = \'${req.body[1].Marka}\'`)
    res.send(result)
})

expressRouter.post('/api/edit/hardware',(req,res) =>{
    const result = sql.query(connectionString,`UPDATE [dbo].[Hardware] SET [dbo].[Hardware].[KorisnikId] = \'${parseInt(req.body.KorisnikId)}\', [dbo].[Hardware].[ProstorijaId] = \'${parseInt(req.body.ProstorijaId)}\', [dbo].[Hardware].[Model] = \'${Object.values(req.body.Model)}\' WHERE [dbo].[Hardware].[HardwareId] = ${req.body.HardwareId}`,(err)=> console.log(err))
    res.send(result)
})
expressRouter.post('/api/edit/relation',(req,res) =>{
    const result = sql.query(connectionString,`UPDATE [dbo].[Software_Hardware] SET [dbo].[Software_Hardware].[SoftwareId] = ${parseInt(req.body[0].SoftwareId)}, [dbo].[Software_Hardware].[HardwareId] = \'${parseInt(req.body[0].HardwareId)}\', [dbo].[Software_Hardware].[Azurirano] = ${req.body[0].Azurirano * 1}, [dbo].[Software_Hardware].[Namjena] = N\'${req.body[0].Namjena}\' WHERE [dbo].[Software_Hardware].[SoftwareId] = \'${parseInt(req.body[1].SoftwareId)}\' AND [dbo].[Software_Hardware].[HardwareId] = \'${parseInt(req.body[1].HardwareId)}\'`)
    res.send(result)
})
expressRouter.post('/api/edit/user',(req,res) =>{
    const result = sql.query(connectionString,`UPDATE [dbo].[Korisnik] SET [dbo].[Korisnik].[Oib] = \'${req.body.Oib}\', [dbo].[Korisnik].[Ime] = N\'${req.body.Ime}\', [dbo].[Korisnik].[Prezime] = N\'${req.body.Prezime}\' WHERE [dbo].[Korisnik].[KorisnikId] = ${parseInt(req.body.KorisnikId)}`)
    res.send(result)
})
expressRouter.post('/api/edit/prostorija',(req,res) =>{
    const result = sql.query(connectionString,`UPDATE [dbo].[Prostorija] SET [dbo].[Prostorija].[Adresa] = N\'${req.body.Adresa}\' WHERE dbo.Prostorija.ProstorijaId = ${req.body.ProstorijaId}`)
    res.send(result)
})
RestApi.use('/',expressRouter);

RestApi.listen(3001)