var swt = require('simplewebtoken');


module.exports = function(token, key, cb) {
  
  // TODO: Parse this and pull out the issuer and audience, pass to query
  
  // TODO: Iterate over all keys, in order to support key rotation
  
  swt.validate(token, { key: key.secret, bypassExpiration: true }, function(err, profile) {
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
