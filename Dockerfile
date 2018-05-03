FROM mongo:latest
COPY . /tmp
RUN chmod +x /tmp/import-crash-data.sh