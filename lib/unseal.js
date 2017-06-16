//var fernet = require('fernet');


module.exports = function(options, keying) {
  if (typeof options == 'function') {
    keying = options;
    options = undefined;
  }
  options = options || {};
  
  return function swt_unseal(sealed, cb) {
  };
};
