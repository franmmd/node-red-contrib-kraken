module.exports = function(RED) {
  function GetQueryOrdersInfo(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {
      // on.input run your actual functionality here
      // return 'send' the output for the next node
      node.send(msg);
    });
  }
  RED.nodes.registerType("query-orders-info", GetQueryOrdersInfo);
}