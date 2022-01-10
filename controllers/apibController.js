const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bloc = mongoose.model('Bloc');

router.get('/anass',function(req,res,next){
    Bloc.find({}).then(function(bloc){
        res.send(bloc);
    }).catch(next);
});



router.post('/youssef',function(req,res,next){
    Bloc.create(req.body).then(function(bloc){
        res.send(bloc);
    }).catch(next);
});


function insertRecord(req, res) {
    var bloc = new Bloc();
    
    bloc.name = req.body.name;
    bloc.libelle = req.body.libelle;
    
    bloc.save((err, doc) => {
        if (!err)
            res.redirect('bloc/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bloc/addOrEdit", {
                    viewTitle: "Insert Bloc",
                    bloc: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Bloc.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('bloc/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("bloc/addOrEdit", {
                    viewTitle: 'Update Bloc',
                    bloc: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Bloc.find((err, docs) => {
        if (!err) {
            res.render("bloc/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving bloc list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'code':
                body['codeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Bloc.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("bloc/addOrEdit", {
                viewTitle: "Update Bloc",
                bloc: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Bloc.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/bloc/list');
        }
        else { console.log('Error in bloc delete :' + err); }
    });
});

module.exports = router;