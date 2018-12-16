module.exports = function(RED) {
   function GetOHLCData(config) {
       RED.nodes.createNode(this,config);
       var node = this;
	
	   this.apiUrl = "https://api.kraken.com/0/public/Time";
	 
        this.on('input', function(msg) {
    	
    	var opts = {
	        method: "GET",
	        url: this.apiUrl,
	        timeout: node.reqTimeout,
	        //followRedirect: nodeFollowRedirects,
	        headers: {},
	        encoding: null,
      	};

		  request(opts, function (error, response, body) {
        node.status({});

        if (error) {       
            node.error(error, msg);
            msg.payload = error.toString() + " : " + url;
            msg.statusCode = error.code;
            node.send(msg);
            node.status({
              fill: "red",
              shape: "ring",
              text: error.code
            });

        } else {

          try { 
          	msg.payload = body.toString('utf8');
          	msg.payload = JSON.parse(msg.payload); 
          } catch(e) { 
          	node.warn(RED._("httpin.errors.json-error")); 
       	  }

          msg.headers = response.headers;
          msg.statusCode = response.statusCode;
          
          node.send(msg);
        }
      })
    });
      	
   }
  RED.nodes.registerType("get-ohlc-data", GetOHLCData);
}