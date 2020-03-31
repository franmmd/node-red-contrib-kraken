module.exports = function(RED) {
  function AddStandardOrder(config) {
	RED.nodes.createNode(this,config);
    var node = this;
	node.status({});
	node.kraken = RED.nodes.getNode(config.kraken);
    node.on('input', function(msg) {
		console.error(node)
		if (!node.kraken) {
			node.error(RED._("kraken.errors.missing-conf"), msg);
			return;
		}
	
		var krakencli = node.kraken ? node.kraken.client: null;
		console.error(krakencli)
		
		this.status({ fill: 'blue', shape: 'dot', text: 'requesting' })
	  
		krakencli.api('AddOrder',msg.payload)
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
  RED.nodes.registerType("add-standard-order", AddStandardOrder);
}