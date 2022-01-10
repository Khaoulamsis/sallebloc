const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Bloc = mongoose.model('Bloc');
const Occupation = mongoose.model('Occupation');
const Salle = mongoose.model('Salle');


router.get('/', (req, res) => {
    var salles=[];
    var numbers=[];
    var nums=[];
    var tab=[];
    var table=[];

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    todayy = yyyy + '-' + mm + '-' + dd;
    Occupation.find((err, docs) => {
        table = JSON.parse(JSON.stringify(docs));

        console.log(docs);
        var t1 = new Date();
        Salle.find((err, docss) => {
            tab = JSON.parse(JSON.stringify(docss));

            for (i = 0; i < tab.length; i++) {
                console.log(tab[i].name);
                salles.push(tab[i].name);
            }
            nums = new Array(salles.length).fill(0);
            console.log(nums)


        for (i = 0; i < table.length; i++) {
            if(table[i].date==todayy){
                for (j = 0; j < salles.length; j++) {
                    if(salles[j]==table[i].namesalle){

                        nums[j]=nums[j]+1;
                        break;
                        

                    }}

                    
                }

                

        }
        console.log(salles+"gfffffffffffff");

        res.render("dashboard", {
            viewTitle: "Vous pouvez visualiser le nombre des occupations d'une salle journellement.",
            testsalles: salles,
            testnums: nums,
            
        });

        });
         
        
        

    });
    




            

});



module.exports = router;