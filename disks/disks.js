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

var DiskResult = mongoose.model(`${COLLECTION_NAME}`, schema);

function addDisk(diskData, cb) {

    var diskResult = new DiskResult(diskData);

    diskResult.save(function(err, diskResult) {

        if(err) {
            cb(err);
        } else {
            cb(null, diskResult);
        }
    });
}

function getDisk(id, cb) {

    DiskResult.findById(id).exec(function(err, diskResult) {

        if(err) {
            cb(err);
        } else {
            cb(null, diskResult);
        }
    });

}

function updateDisk(diskData, cb) {

    var paramId = diskData.paramId;
    delete diskData.paramId;
        
    DiskResult.findOneAndUpdate({_id: paramId}, diskData, function(err, disk){

        if(err) {
            cb(err);
        } else {
            cb(null, disk);
        }
    });

}

function deleteDisk(id, cb) {

    DiskResult.findByIdAndRemove(id).exec(function(err, diskData) {
        
        if(err) {
            cb(err);
        } else {
            cb(null, diskData);
        }
    });

}

function listDisks(cb) {

    DiskResult.find({}).exec(function(err, disks){

        if(err) {
            cb(err);
        } else {
            cb(null, disks);
        }

    });

}

module.exports = {
    add: addDisk,
    get: getDisk,
    update: updateDisk,
    delete: deleteDisk,
    list: listDisks
};