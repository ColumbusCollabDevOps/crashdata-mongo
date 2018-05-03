#!/bin/bash

echo "Creating crashdata db"
mongo create-crash-collection.js

for crashfile in /tmp/crashdata/*.csv; do
    echo "processing $crashfile"
    mongoimport -c crashdata --type csv --headerline $crashfile
done

echo "Scrubbing empty geo data and building index"
mongo scrub-and-create-index.js
