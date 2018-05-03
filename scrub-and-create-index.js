db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { ODOT_LATITUDE_NBR: "" }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

 db.crashdata.aggregate(
    [
        { "$addFields": { 
            "location": { type:"Point", coordinates: [ "$ODOT_LONGITUDE_NBR", "$ODOT_LATITUDE_NBR" ] } 
        }},
        { "$out": "crashdata" }
    ]
);

db.crashdata.createIndex({geoloc: "2dsphere"});