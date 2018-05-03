# SmartColumbus Crash data imported into mongo db


## import csv data into a collection
mongoimport -c crashdata --type csv --headerline /tmp/fairfield_crashes_14_16.csv

## clean empty rows, Some crash rows have now lat/long
db.runCommand(
   {
      delete: "crashdata",
      deletes: [ { q: { ODOTLATITUDENBR: "" }, limit: 0 } ],
      writeConcern: { w: "majority", wtimeout: 5000 }
   }
);

## add geoJSON field named location
db.crashdata.aggregate(
    [
        { "$addFields": { 
            "location": { type:"Point", coordinates: [ "$ODOTLONGITUDENBR", "$ODOTLATITUDENBR" ] } 
        }},
        { "$out": "crashdata" }
    ]
);

## create a geo index for the data
db.crashdata.createIndex({geoloc: "2dsphere"});


## sample query for geo search
db.runCommand( {
   geoNear: "crashdata" ,
   near: { type: "Point" , coordinates: [ -82.791618, 39.910620 ] } ,
   spherical: true,
   maxDistance: 10
} );