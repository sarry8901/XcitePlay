const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const config = require('config');


const app = express();
app.use(express.static(path.join(__dirname,'client','build')));
app.get('/', (req,resp) => {
   console.log('hellow orld!');
  resp.sendFile(path.join(__dirname,'client','build','index.html'));
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = config.get('mongoURI');

mongoose
  .connect(
    db,
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        //useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


  //app.get('*', (req,resp) => {
    //console.log('hellow orld!');
    //resp.sendFile(__dirname+'/index.html');
  //})  
  app.use('/api/user', require('./routes/api/user'));
  app.use('/api/events', require('./routes/api/events'));
  app.use('/api/auth', require('./routes/api/auth'));

  const port = process.env.PORT || 8080;

if(process.env.NODE_ENV=='production'){
  app.use(express.static("client/build"));
}


  app.listen(port, () => console.log(`Server running on port ${port}`));

  module.exports = app;