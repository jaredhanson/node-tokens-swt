var swt = require('simplewebtoken');


module.exports = function swt_seal(claims, options, cb) {
  var opts = {};
  opts.key = options.secret;

  opts.issuer = claims.Issuer;
  opts.audience = claims.Audience;

  var now = new Date()
    , ms;
  if (claims.ExpiresOn) {
    opts.expiresInMinutes = 1; // TODO: do this calculation
  } else if (options.expiresAt) {
    ms = options.expiresAt.getTime() - now.getTime();
    opts.expiresInMinutes = Math.floor(ms / (1000 * 60));
  }

  var token = swt.sign(claims, opts);
  return cb(null, token);
};
