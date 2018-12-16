const key          = '...'; // API Key
const secret       = '...'; // API Private Key
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);

module.exports = function(RED) {
	function GetAssetInfo(config) {
		RED.nodes.createNode(this, config)
		var node = this
		this.account = RED.nodes.getNode(config.account)
	  
		node.on('input', function(msg) {
			this.status({ fill: 'blue', shape: 'dot', text: 'requesting' })
		  
			kraken.api('Assets')
			.then(result => {
			//	console.log(result);
				  msg.payload = result.result
				  node.send([msg, null])
				  this.status({})
			})
			.catch(error => {
			  this.status({ fill: 'red', shape: 'dot', text: 'error' })
			  msg.payload = error
			  node.send([null, msg])
			})	

		});
    }
    RED.nodes.registerType('get-asset-info', GetAssetInfo)
}

