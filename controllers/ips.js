
var mongoose = require('mongoose'),
ipv4 = mongoose.model('ipv4'),
csv = require('csvtojson'),
fs = require('fs');


exports.findByIp = function(req, res){
	//Finds an IP from an IP string 
	var ip = req.params.ip.ip2int();

	ipv4.find({})
		.where("ip_from").lte(ip)
		.where("ip_to").gte(ip)
		.limit(1)
		.exec(function(err, result){
			if(result){
				return res.send(result[0]);
			}else{
				return res.status(400).send('No Results Found');
			}
		})

};


exports.import = function(req, res){
	//Imports a file from the location specified in the .env to the db specified in the .env 

	var inputFile = process.env.CSV_LOCATION;
	console.log(inputFile);
	var importCount = 0;
	var headers = [
		  "ip_from",
		  "ip_to",
		  "country_code",
		  "country_name", 
		  "region_name",
		  "city_name",
		  "latitude",
		  "longitude",
		  "zip_code",
		  "time_zone"
	]


	if (fs.existsSync(inputFile)) {

		//First remove all of the records currently in the DB
		ipv4.remove({}, function(){
			//Then in the callback add all of the new items to the DB
			csv({noheader:true})
				.fromFile(inputFile)
				.on('csv',(csvRow)=>{
					var csvRowWithKeys = {};
					for (var i = 0, len = csvRow.length; i < len; i++) {
				  		csvRowWithKeys[headers[i]] = csvRow[i];
					}

					ipv4.create(csvRowWithKeys, function(err, documents) {
						if (err) throw err;
						
						importCount = importCount + 1;
					});


				})
				.on('done',(error)=>{
					return res.send(importCount + ' ips have been successfully created in the database.');
				})
		})
		

	}else{
		return res.status(400).send('No CSV file found!');
	}
		
};