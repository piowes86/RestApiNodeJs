const express = require("express");
const discs = require("../discs");

const router = express.Router();

router.get("/discs", function(req, res) {

    discs.list(function(err, data){
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

router.post("/discs", function(req, res) {

    discs.add(req.body, function(err, data){

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

router.get("/disc/:id", function(req, res) {

    discs.get(req.params.id, function(err, data) {

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

router.put("/disc/:id", function(req, res) {

    req.body.paramId = req.params.id;

    discs.update(req.body, function(err, data) {

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

router.delete("/disc/:id", function(req, res) {

    discs.delete(req.params.id, function(err, data) {

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