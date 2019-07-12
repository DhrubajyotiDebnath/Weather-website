const express = require('express')
const path = require('path')
const hbs = require('hbs')
const utils = require('./utils')

const publicdir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdir))


 app.get('',(req,res)=>{
     res.render('index',{
         title: 'Weather Application',
         body: 'Dhruba'
     })
 })

app.get('/Help',(req,res) => {
    res.render('helppage',{
        title: "Help Page",
        body: 'Dhruba'
        
    })
})

 app.get('/Aboutpage',(req,res) => {
     res.render('aboutpage',{
        title: 'About this project',
        body: 'Dhruba'
     })
 })

app.get('/Weather',(req,res) => {
    if (!req.query.address){
        return res.send({error:'Please provide a location'})
    }
    
    utils.geoloc(req.query.address,(error,{latitude,longitude,place} = {})=>{
        
        if (error){
            return res.send({error})
        }
    
        utils.forecast(latitude,longitude,(error,fdata)=>{
            if (error){
                return res.send({error})
            }   
            
            res.send({
                forecast:fdata,
                location:place,
                address: req.query.address
            })
            
        })
    })

})

app.get("/Help/*",(req,res) => {
    res.render('404',{
        title: "Help article not found",
        body: "Dhruba",
        errormsg: "Error 404 - Page not Found"
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: "Page Not Found",
        body:"Dhruba",
        errormsg: "Error 404 - Page not Found"
    })
})

app.listen(port,() => {
    console.log("Strting the Server on port " + port + "...")
})