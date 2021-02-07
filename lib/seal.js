var swt = require('simplewebtoken');


module.exports = function(options) {
  options = options || {};
  
  return function swt_seal(claims, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    var audience = options.audience || [];
    if (audience.length > 1) {
      return cb(new Error('Unable to seal fernet tokens for multiple recipients'));
    }
    
    
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
};
