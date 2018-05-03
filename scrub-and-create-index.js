db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { ODOTLATITUDENBR: "" }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

 db.crashdata.aggregate(
    [
        { "$addFields": { 
            "location": { type:"Point", coordinates: [ "$ODOTLONGITUDENBR", "$ODOTLATITUDENBR" ] } 
        }},
        { "$out": "crashdata" }
    ]
);

db.crashdata.createIndex({geoloc: "2dsphere"});