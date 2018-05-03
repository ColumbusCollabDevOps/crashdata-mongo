/** removes rows with no lat data*/
db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { ODOT_LATITUDE_NBR: "" }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

/** a couple object id's have some garbage spaces in them. deleting as well */
 db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { OBJECTID: /\D/ }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

 /** Create geoJSON Point data field named location on the collection */
 db.crashdata.aggregate(
    [
        { "$addFields": { 
            "location": { type:"Point", coordinates: [ "$ODOT_LONGITUDE_NBR", "$ODOT_LATITUDE_NBR" ] } 
        }},
        { "$out": "crashdata" }
    ]
);

/** Build a 2dsphere index for the crashdata collection */
db.crashdata.createIndex({location: "2dsphere"});