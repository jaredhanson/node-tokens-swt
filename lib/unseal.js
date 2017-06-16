var swt = require('simplewebtoken');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  return function swt_unseal(sealed, cb) {
    // The decryption keys have been obtained, query for the verification keys.
    var query  = {
      usage: 'verify',
      algorithms: [ 'hmac-sha256' ]
    }
    
    keying(query, function(err, keys) {
      if (err) { return cb(err); }
      
      // TODO: Iterate over all keys, in order to support key rotation
      
      var key = keys[0];
      
      swt.validate(sealed, { key: '12abcdef7890abcdef7890abcdef7890', bypassExpiration: true }, function(err, profile) {
        if (err) { return cb(err); }
        
        var tkn = {
          headers: {
            issuer: profile.issuer,
            audience: [ profile.audience ],
            expiresAt: profile.expiresAt
          },
          claims: profile.claims
        }
        return cb(null, tkn);
      });
    });
  };
};
