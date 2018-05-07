# SmartColumbus Crash data imported into mongo db container

This project builds a container for crash data provided by the smart columbus hackaton team. 

## Usage
Clone this repo, build the image, run image, shell into the container and run */tmp/import-crash-data.sh* to load data, scrub and index. 

    docker build -t crashdata .
    docker run -d --name crashdata crashdata
    docker exec -it crashdata bash
    /tmp/import-crash-data.sh

If all goes well you should be able run the following spatial query to find a crash within radius of a GPS coordinate.

## sample query for geo search
    db.runCommand( {
       geoNear: "crashdata" ,
       near: { type: "Point" , coordinates: [ -82.899808, 40.171602 ] } ,
       spherical: true,
       maxDistance: 10
    } );
