const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const DB_USER = "USERNAME";
const DB_PASSWORD = "PASSWORD";
const DB_NAME = "DATABASE_NAME";
const COLLECTION_NAME = "COLLECTION_NAME";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${DB_NAME}?authMechanism=SCRAM-SHA-1&authSource=${DB_NAME}`);

var schema = new mongoose.Schema({
    style: [String],
    thumb: String,
    title: String,
    country: String,
    format: [String],
    uri: String,
    community: {
            want: Number, 
            have: Number
        },
    label: [String],
    catno: String,
    year: String,
    genre: [String],
    resource_url: String,
    type: String,
    id: Number,
    barcode: [String]
});

var DiscResult = mongoose.model(`${COLLECTION_NAME}`, schema);

function addDisc(discData, cb) {

    var discResult = new DiscResult(discData);

    discResult.save(function(err, discResult) {

        if(err) {
            cb(err);
        } else {
            cb(null, discResult);
        }
    });
}

function getDisc(id, cb) {

    DiscResult.findById(id).exec(function(err, discResult) {

        if(err) {
            cb(err);
        } else {
            cb(null, discResult);
        }
    });

}

function updateDisc(discData, cb) {

    var paramId = discData.paramId;
    delete discData.paramId;
        
    DiscResult.findOneAndUpdate({_id: paramId}, discData, function(err, disc){

        if(err) {
            cb(err);
        } else {
            cb(null, disc);
        }
    });

}

function deleteDisc(id, cb) {

    DiscResult.findByIdAndRemove(id).exec(function(err, discData) {
        
        if(err) {
            cb(err);
        } else {
            cb(null, discData);
        }
    });

}

function listDiscs(cb) {

    DiscResult.find({}).exec(function(err, discs){

        if(err) {
            cb(err);
        } else {
            cb(null, discs);
        }

    });

}

module.exports = {
    add: addDisc,
    get: getDisc,
    update: updateDisc,
    delete: deleteDisc,
    list: listDiscs
};