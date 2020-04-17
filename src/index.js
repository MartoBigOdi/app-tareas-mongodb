require('dotenv').config();
const figlet = require('figlet');

const app = require('./server');
require('./database');

// Server is listening
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