// Update api credentials and sync server time
// note: syncing to exchange server time is async so we need a callback

const KrakenClient = require('kraken-api');

function updateKrakenConfig(node, callback) {
  node.kraken.options({
    APIKEY: node.credentials.apiKey,
    APISECRET: node.credentials.apiSecret,
    useServerTime: true,
    test: false
  }, callback);
}

module.exports = function (RED) {
	
  function KrakenNode(n) {
    RED.nodes.createNode(this,n)
    var node = this
    node.status({})

    if (!node.credentials || !node.credentials.apiKey || !node.credentials.apiSecret) {
	  console.error(node)
	  console.error(node.credentials)
      console.error("Missing kraken API credentials")
      node.error(RED._("kraken.errors.missing-conf"))
    }else{
		node.client = new KrakenClient(node.credentials.apiKey, node.credentials.apiSecret);
		console.error(node)
	}
  }
  
  RED.nodes.registerType("kraken-credentials", KrakenNode, {
    credentials: {
      apiKey: {type: "password"},
      apiSecret: {type: "password"}
    }
  });
}