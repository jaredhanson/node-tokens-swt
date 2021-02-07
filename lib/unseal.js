var swt = require('simplewebtoken');


module.exports = function() {
  
  return function swt_unseal(sealed, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    // TODO: Parse this and pull out the issuer and audience, pass to query
    
    // TODO: Iterate over all keys, in order to support key rotation

    var key = options.secret;

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
  };
};
