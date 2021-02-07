var swt = require('simplewebtoken');
var seal = require('../lib/seal');
var sinon = require('sinon');
var expect = require('chai').expect;


describe('seal', function() {
  
  describe('using defaults', function() {
    var keying;

    before(function() {
      /*
      keying = sinon.spy(function(q, cb){
        if (!q.recipient) {
          return cb(null, [ { secret: '12abcdef7890abcdef7890abcdef7890' } ]);
        }
      });
      */
    });
    
    
    describe('signing to self', function() {
      var token;
      var now = new Date();
      
      before(function(done) {
        seal({ Issuer: 'self', Audience: 'self', Foo: 'bar' }, { secret: '12abcdef7890abcdef7890abcdef7890', expiresAt: new Date(Date.now() + 1000) }, function(err, t) {
          token = t;
          done(err);
        });
      });
      
      /*
      after(function() {
        keying.reset();
      });
      */
      
      /*
      it('should query for key', function() {
        expect(keying.callCount).to.equal(1);
        var call = keying.getCall(0);
        expect(call.args[0]).to.deep.equal({
          recipient: undefined,
          usage: 'sign',
          algorithms: [ 'hmac-sha256' ]
        });
      });
      */
      
      it('should generate a token', function() {
        expect(token.indexOf('&HMACSHA256=') != -1).to.be.true;
      });
      
      describe('verifying token', function() {
        var claims;
        before(function(done) {
          swt.validate(token, { key: '12abcdef7890abcdef7890abcdef7890', bypassExpiration: true }, function(err, profile) {
            if (err) { return done(err); }
            claims = profile;
            done();
          });
        });
        
        it('should be valid', function() {
          expect(claims.claims).to.be.an('object');
          expect(claims.claims.Foo).to.equal('bar');
        });
      });
    }); // signing to self
  
  }); // using defaults
  
}); // seal
