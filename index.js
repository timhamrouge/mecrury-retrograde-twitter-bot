var Twit = require('twit')
require('dotenv').config();

console.log(process.env.TWITTER_CONSUMER_KEY)
 
var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

T.get("account/verify_credentials", {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated)

function onAuthenticated(err, res) {
  if (err) {
      throw err
  }

  console.log("Authentication successful. Running bot...\r\n")
} 