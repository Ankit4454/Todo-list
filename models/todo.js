const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
    list_name:{
        type: String,
        required: true
    },
    task_name: [{type: String, required: true}]
});

const List = mongoose.model('List', listSchema);

module.exports.list = List;