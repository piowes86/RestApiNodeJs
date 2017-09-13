const express = require("express");
const disks = require("../disks");

const router = express.Router();

router.get("/disks", function(req, res) {

    disks.list(function(err, data){
        if(err) {
            res.status(404);
            res.json({
               error: "Some error has appeared"
            });
       } else {
           res.json(data);
       }
    });

});

router.post("/disks", function(req, res) {

    disks.add(req.body, function(err, data){

        if(err) {
             res.status(404);
             res.json({
                error: "Disk not saved"
             });
        } else {
            res.json(data);
        }

   });

});

router.get("/disk/:id", function(req, res) {

    disks.get(req.params.id, function(err, data) {

        if(err) {
            res.status(404);
            res.json({
                error: "No user found"
            })
        } else {
            res.json(data);
        }

    });

});

router.put("/disk/:id", function(req, res) {

    req.body.paramId = req.params.id;

    disks.update(req.body, function(err, data) {

        if(err) {
            res.status(404);
            res.json({
                error: "Disk not updated"
            });
        } else {
            res.json(data);
        }

    })

});

router.delete("/disk/:id", function(req, res) {

    disks.delete(req.params.id, function(err, data) {

        if(err) {
            res.status(404);
            res.json({
                error: "Disk not deleted"
            });
        } else {
            res.json(data)
        }

    });

});

module.exports = router;