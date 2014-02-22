var fs = require('fs')
var DigitalOcean = require('./index');
ocean = new DigitalOcean(fs.readFileSync(__dirname+'/private/clientid').toString('utf8'), fs.readFileSync(__dirname+'/private/apikey').toString('utf8'));

ocean.getDroplets(function(err, res, body) {
  console.log(body);
});

ocean.getRegions(function(err, res, body) {
  console.log(body);
})

ocean.getSSHKeys(function(err, res, body) {
  console.log(body);
})

ocean.getImages(function(err, res, body) {
  console.log(body);
})

ocean.getSizes(function(err, res, body) {
  console.log(body);
});

ocean.getDomains(function(err, res, body) {
  console.log(body);
});

ocean.Droplets.get(1124756, function(err, res, body) {
  console.log(body);
})
