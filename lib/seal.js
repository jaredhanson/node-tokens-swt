var swt = require('simplewebtoken');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
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
    
    var query  = {
      usage: 'sign',
      recipient: audience[0],
      algorithms: [ 'hmac-sha256' ]
    }
    
    keying(query, function(err, keys) {
      if (err) { return cb(err); }
      
      var key = keys[0];
      
      var opts = {};
      opts.key = key.secret;
      
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
    });
  };
};
