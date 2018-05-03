/** removes rows with no lat data*/
log('Removing empty lat long rows');
db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { ODOT_LATITUDE_NBR: "" }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

/** a couple object id's have some garbage spaces in them. deleting as well */
log('removing weird object id fields');
 db.runCommand(
    {
       delete: "crashdata",
       deletes: [ { q: { OBJECTID: /\D/ }, limit: 0 } ],
       writeConcern: { w: "majority", wtimeout: 5000 }
    }
 );

 log('Creating geoJSON Point field on collection using lat and long fields');
 db.crashdata.aggregate(
    [
        { "$addFields": { 
            "location": { type:"Point", coordinates: [ "$ODOT_LONGITUDE_NBR", "$ODOT_LATITUDE_NBR" ] } 
        }},
        { "$out": "crashdata" }
    ]
);

log('Creating index for crashdata collection');
db.crashdata.createIndex({location: "2dsphere"});