/**
 * Created by anuj on 1/15/14.
 */
var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
  this.clients[id] = client;

  this.on('broadcast', function(senderId, message) {
    if(id != senderId) {
      this.clients[id].write(message);
    }
  });
});

var server = net.createServer(function(client) {
  var id = client.remoteAddress + ':' + client.remotePort;
  channel.emit('join', id, client);

  client.on('data', function(data) {
    channel.emit('broadcast', id, data);
  });
});

server.listen(8888);