const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_list', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error while connecting to db'));

db.once('open', function(){
    console.log('Succesfully connected to the database');
});