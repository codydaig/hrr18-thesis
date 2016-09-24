const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cred = '../creds'

var strategy = new Auth0Strategy(cred.Auth0options, function(accessToken, refreshToken, extraParams, profile, done){
   return done(null, profile);
});
