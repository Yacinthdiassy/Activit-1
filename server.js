let express = require('express')
let app = (express)()
let bodyParser = require('body-parser')
let ejs=require('ejs')
let session = require('express-session')
//Moteur de template
app.set('view engine', 'ejs')

//Middelware
app.use('/assets', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'kjqjkdt',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  app.use(require('./middlewares/flash'))

//Route
app.get('/', (request, response)=> {
    let Eleve = require('./models/eleve')
    Eleve.all(function(eleve){
        response.render('pages/index', {eleve: eleve})
    })
})
app.post('/', (request, response)=>{
    // console.log(request.body)
    if(request.body.nom === undefined || request.body.nom === ''){
        // response.render('pages/index', {error: "Vous n'avez pas entré un message "})
        request.flash('error', "Vous n'avez enregistré aucun nom")
        response.redirect('/')
    }else{
        let Eleve = require('./models/eleve')
        Eleve.create(request.body.nom, function(){
            request.flash('success', "Elève bien enregistré !")
            response.redirect('/')
        }) 
    }
})

app.listen(8080);
console.log('8080 is the magic port')