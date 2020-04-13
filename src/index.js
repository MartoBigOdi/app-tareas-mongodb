const express = require('express'); //Requerimos express y acordemos nos que esto devuelve un objeto y este lo metemos en "const app" para luego darle uso.
const colors = require('colors');
const figlet = require('figlet');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOvr = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initiliaze
const app = express();
require('./database');
require('./config/passport');


//Setting
app.set('port', process.env.PORT || 3085);//Acá seteamos el port número 3085. ESto dice si existe un puerto en mi computador que lo tome sino que utilice el 3085.
app.set('views', path.join(__dirname, 'views'));//Le decimos en que carpeta se configura.
app.engine('.hbs',exphbs({ //ordenando el motor de plantilla
    defaultLayout: 'main',
    layoutsDir: path.join(app.get ('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Midleware
app.use(flash());
app.use(express.urlencoded({extended:false}));
app.use(methodOvr('_method'));//Dsd los form van a poder enviar otros tipos de datos, DELETE o PUT.
app.use(session({ //Organizamos las sesiones.
    secret: 'misecretapp',
    resave: true,
    saveUninitialized:true
}));
app.use(express.json());
//Acá seteamos 'passport'.
app.use(passport.initialize());
app.use(passport.session());



//Global Variables
//Acá le indicamos que los msjes de flash se pueden utilizar en todas las vitas donde se soliciten.
app.use((req, res, next) =>{
    app.locals.ok = req.flash('ok');
    app.locals.borrada = req.flash('borrada');
    app.locals.message = req.flash('message');
    app.locals.correcto = req.flash('correcto');
    app.locals.usuarioRepetido = req.flash('usuarioRepetido');
    app.locals.nuevoUsuario = req.flash('Usuario creado')
    app.locals.user = req.user;//De esta manera podemos mostrar el user que tenemos guardado en la session dsp del login o registro. En cualquier vista. 
    next();
   });

//Routes 
//Tienen que estar inicializadas sino va dar un err. debido que las rutas nombradas estan vacias.
app.use(require('./routes/seguimiento'));
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use('/seguimiento',require('./routes/seguimiento')); //Aá conectamos esta carpeta 'seguimiento' con la ruta 'seguimietno.js porque se necesitan sus recursos para que puedan enviar o recibir.


//Static Files
//Desde express configuramos los archivos statics.
app.use(express.static(path.join(__dirname, 'public')));


//Server is Listenning
app.listen(app.get('port'), () => {
    console.log('Server on Port'.rainbow.italic, app.get('port'));
    figlet.text('Seguimiento', {
    font: 'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
}); //Iniciamos el servidor con el puerto que seteamos arriba en settings. Y notificamos mediante consola con un message que se inicio correctamente.