const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const port = 8000;

const List = require('./models/todo'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

var todoList = [
    {
        list_name: "Youtube",
        list_item: [
            "Record a video",
            "Lexnos",
            "GS"
        ]
    },
    {
        list_name: "Vegetables",
        list_item: [
            "Spinch",
            "Lady finger"
        ]
    },
    {
        list_name: "Others",
        list_item: [
            "Shave",
            "Buzz"
        ]
    }
];

var id = {};

app.get('/', function(req,res){
    
    id.name = req.query.id;

    List.list.find({}, function(err, list){
        if (err){
            console.log('error while fetching data from db!');
            return;
        }
        List.list.findById(id.name, function(err, task){
            if (err){
                console.log('error while fetching data from db!');
            }
            
            return res.render('home', {
                title: "Home",
                name: list,
                list_title: task,
                task_list: task
            });
        });        
    });
});

app.post('/create-list', function(req,res){
    
    List.list.create({
        list_name: req.body.list_name
    }, function(err, newList){
        if (err){
            console.log('error while creating a list!');
            return;
        }
        console.log('*****', newList);
        return res.redirect('back');
    });

});

app.post('/create-task', function(req,res){
    
    List.list.findById(id.name, function(err,doc){
        if (err){
            console.log('error while creating a task!');
            return;
        }
        doc.task_name.push(req.body.list_item);
        doc.save();
        return res.redirect('back');
    });
});

app.get('/delete-list', function(req,res){
    
    List.list.findByIdAndDelete(id.name, function(err){
        if (err){
            console.log('error while deleting an object from db!');
            return;
        }
        return res.redirect('/');
    });
});

app.post('/delete-task', function(req,res){
    
    List.list.findById(id.name, function(err,doc){
        if (err){
            console.log('error while deleting an object from db!');
            return;
        }

        let tasks = req.body.check;

        let taskList = doc.task_name;

        if (typeof tasks === 'object'){
            for (let i=0; i<tasks.length; i++){
                taskList.splice(taskList.indexOf(tasks[i]), 1);
            }
        }
        else if (typeof tasks === 'string'){
            taskList.splice(taskList.indexOf(tasks), 1);
        }

        doc.save();
        return res.redirect('back');
    });

});


app.listen(port, function(err){
    if (err){
        console.log(`Error while running the server: ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});