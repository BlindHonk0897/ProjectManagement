module.exports = function(app){
    app.get('/manager_takenProjects',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Type":"Taken"}).toArray(function(err,doc){
            res.render('../views//manager_takenProjects.ejs',{User:req.session.username,Project:doc});
        });
    })
    app.get('/manager_addTasks',function(req,res){
        res.render('../views/manager_addTasks.ejs',{User:req.session.username});
    })
    app.get('/manager_clients',function(req,res){
        res.render('../views/manager_clients.ejs',{User:req.session.username});
    })
    app.get('/manager_viewTasks',function(req,res){
        res.render('../views/manager_viewTasks.ejs',{User:req.session.username});
    })
    app.get('/manager_openProjects',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('Projects').find({"Type":"Open"}).toArray(function(err,doc){
            res.render('../views/manager_openProjects.ejs',{User:req.session.username,Project:doc});
        });
        // db.collection('Projects').find({},function(err,result){
        //     console.log(result.ProjectName);
        //     res.render('../views/manager_openProjects.ejs',{User:req.session.username});
        // })
    })
    app.get('/manager_addProjects',function(req,res){
        res.render('../views/manager_addProjects.ejs',{User:req.session.username});
    })
    app.get('/manager_assignedClients',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        db.collection('User').find({"Type":"Client","Status":"Assigned"}).toArray(function(err,doc){
            console.log(doc)
            res.render('../views/manager_assignedClients.ejs',{User:req.session.username,Users:doc});
        });
    })
    app.get('/manager_unassignedClients',function(req,res){
        var mongoUtil = require( '../../public/assets/scripts/mongdb' );
        var db = mongoUtil.getDb();
        var Projects;
        db.collection('Projects').find({"Type":"Open"}).toArray(function(err,doc){
            Projects = doc;
        });
        db.collection('User').find({"Type":"Client","Status":"Unassigned"}).toArray(function(err,doc){
            res.render('../views/manager_unassignedClients.ejs',{User:req.session.username,Users:doc,Project:Projects});
        });

    })
    app.get('/manager_addClients',function(req,res){
        res.render('../views/manager_addClients.ejs',{User:req.session.username});
    })
    app.get('/manager_dashboard',function(req,res){
        res.render('../views/manager_dashboard.ejs',{User:req.session.username});
    })
}