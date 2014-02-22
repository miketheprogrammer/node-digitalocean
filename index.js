//var hyperquest  = require('hyperquest');
var qs          = require('querystring');
var request     = require('request');
var util        = require('util');
var debug       = require('debug');

var Required = function(key, value, cb, comparator) {
  var error = new Error(key+' is Required');
  if (comparator) {
    if (!comparator(value)) {
      if (cb) return cb(error);
      throw error;
    }
  }

  if (value === undefined) {
    if (cb) return cb(err);

    throw error;
  }

  return true;
}

var BaseApi = function (clientId, apiKey) {
  this.key = (apiKey || process.env.API_KEY);
  this.clientId = (clientId || process.env.CLIENT_ID);
  if (this.key.length < 1 || this.clientId < 1) {
    throw new Error('API Key & ClientId Required');
  }

  this.baseUrl = 'https://api.digitalocean.com/';
}

BaseApi.prototype.request = function (url, opts, cb) {
  var query = {client_id:this.clientId, api_key: this.key};
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  for (var key in opts) {
    query[key] = opts[key];
  }

  url = url + '?' + qs.stringify(query);
  console.log(url);
  request(url, cb);
}

var DigitalOcean = module.exports = function (clientId, apiKey) {
  BaseApi.call(this, clientId, apiKey);

  this.Droplets = new Droplet(clientId, apiKey);
}

util.inherits(DigitalOcean, BaseApi);

DigitalOcean.prototype.getDroplets = function (cb) {
  this.request(this.baseUrl+'droplets/', cb);
}

DigitalOcean.prototype.getRegions = function (cb) {
  this.request(this.baseUrl+'regions/', cb);
}

DigitalOcean.prototype.getSSHKeys = function (cb) {
  this.request(this.baseUrl+'ssh_keys', cb);
}

DigitalOcean.prototype.getImages = function (cb) {
  this.request(this.baseUrl+'images', cb);
}

DigitalOcean.prototype.getSizes = function (cb) {
  this.request(this.baseUrl+'sizes', cb);
}

DigitalOcean.prototype.getDomains = function (cb) {
  this.request(this.baseUrl+'domains', cb);
}

DigitalOcean.prototype.getEvent = function (eventId, cb) {
  this.request(this.baseUrl+'events/'+eventId, cb);
}

var Droplet = function(clientId, apiKey) {
  BaseApi.call(this, clientId, apiKey);
  this.baseUrl = 'https://api.digitalocean.com/droplets/';
}

util.inherits(Droplet, BaseApi);

Droplet.prototype.new = function(opts, cb) {
  required('name', opts.name, cb);
  required('size_id', opts.size_id, cb);
  required('image_id', opts.image_id, cb);
  required('region_id', opts.region_id, cb);

  this.request(this.baseUrl+'new', opts, cb);
}

Droplet.prototype.get = function(id, cb) {
  this.request(this.baseUrl+id, cb);
}



