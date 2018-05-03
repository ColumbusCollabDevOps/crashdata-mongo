#!/bin/bash

echo "Creating crashdata db"
mongo --verbose --eval "db.createCollection('crashdata');"

for crashfile in /tmp/crashdata/*.csv; do
    echo "processing $crashfile"
    mongoimport -c crashdata --type csv --headerline $crashfile
done

echo "Scrubbing empty geo data and building index"
mongo --verbose scrub-and-create-index.js
