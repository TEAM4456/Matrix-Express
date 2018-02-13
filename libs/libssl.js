'use strict';
var lex = require('greenlock-express').create({
  // set to https://acme-v01.api.letsencrypt.org/directory in production
  server: 'staging'
, challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }
, store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })
, approveDomains: approveDomains
});
function approveDomains(opts, certs, cb) {
  if (certs) {
    opts.domains = certs.altnames;
  }
  else {
    opts.email = 'sjc4456@gmail.com';
    opts.agreeTos = true;
  }
  // maybe fix eventually
  opts.domains=["scouting.frc4456.com"];
  cb(null, { options: opts, certs: certs });
}
module.exports.lex = lex;