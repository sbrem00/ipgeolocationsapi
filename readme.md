
IPGeoLocations API
======

This is a simple API to return IP location details. It uses a CSV file that needs to be downloaded from https://lite.ip2location.com/ however it can be ammended to use any ip location csv. 

This was created as I had a load of records that required IP Location lookups and the free online services I found all have a maximum number of requests per minute set meaning my IP would get blacklisted. If you are haing the same issue feel free to download this to create your own API.  


###Install instructions:

1. Install Node and npm https://nodejs.org/en/download/

2. Install MongoDB https://docs.mongodb.com/manual/installation/

3. Clone the repository to a folder

4. Run `npm install` to get the dependancies

5. Download the ip data CSV from https://lite.ip2location.com/ and save to the /csv folder (The import currectly only supports DB11 which inludes all avialable fields).

6. Copy the .env.example file and fill in the DB_HOST (e.g. mongodb://localhost/lplocations) and CSV_LOCATION (e.g. ./csv/IP2LOCATION-LITE-DB11.CSV)

7. In the command line navigate to the folder the appication is in and run 'node server.js'

8. Navigate to the url http://localhost:3001/import in your browser and wait for the csv file to be imported into the mongo database. (This will likely take some time so please be patient.) If you would like to see the records being inserted into mongodb you can download a GUI such as MongoDB Compass. Note that the request may appear to timeout however if you query the db you will be able to tell if it has actually timed out or just the page has. 

You are now ready to lookup IP Locations.

###Usage Instructions:

To lookup IP location, navigate to the address `http://localhost:3001/v1/ipaddress` (e.g. http://localhost:3001/v1/123.456.789.10) if there is a matching record in the database you will recieve a response with a 200 code and a json object with the IP location details. If there are no matching records, you will recieve a 400 code and a message saying there are no matching records.  

Currently this is just setup to lookup IPV4 addresses but I may expand it in the future to use IPV6 addresses. Let me know if this would be useful to you. 


####Modules Used:
- **express** https://www.npmjs.com/package/express
- **csvtojson** https://www.npmjs.com/package/csvtojson
- **dotenv** https://www.npmjs.com/package/dotenv