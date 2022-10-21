var Twit = require('twit')
require('dotenv').config();
const axios = require('axios')

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

async function getRetrograde() {
  const today = new Date().toISOString().slice(0,10)
  try { 
    const result = await axios({
      method: 'get',
      url: `http://localhost:3000/is-mercury-retrograde?date=${today}`,
      responseType: 'stream'
    }).then(function (response) {
      console.log(response.data)
    });
    
    // return result
  }
  catch (err) {
    console.log(err);
  }
}

async function postTweet() {
  const isRetrograde = await getRetrograde()
  console.log(isRetrograde)
}

postTweet()

// T.post("statuses/update", {
//   try {

//   }
//   catch (err) {
//     console.log(err)
//   }



//   status: response
// }, onTweeted) 

// function onTweeted(err, reply) {
//   if (err !== undefined) {
//       console.log(err)
//   } else {
//       console.log("Tweeted: " + reply.text)
//   }
// } 