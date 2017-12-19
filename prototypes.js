

	//Create a new prototype to replace all of a certain char in a string
	String.prototype.replaceAll = function(search, replacement) {
	    var target = this;
	    return target.split(search).join(replacement);
	};

	String.prototype.int2ip = function(){
		var ip = this;
		return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
	}

	String.prototype.ip2int = function(){
		var ip = this;
		return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
	}

