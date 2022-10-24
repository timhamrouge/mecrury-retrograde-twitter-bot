var Twit = require('twit')
require('dotenv').config();
const axios = require('axios')
 
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

// async function getRetrograde() {
//   const today = new Date().toISOString().slice(0,10)
//   try { 
//     const result = await axios({
//       method: 'get',
//       url: `http://localhost:3000/is-mercury-retrograde?date=${today}`,
//       responseType: 'stream'
//     }).then(function (response) {
//       console.log(response)
//     });
    
//     // return result
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

const getRetrograde = async () => {
  const today = new Date().toISOString().slice(0,10)
try {
  const response = await axios.get(
    `http://localhost:3000/is-mercury-retrograde?date=${today}`
  )
  return response.data
} catch (err) {
  console.log('error')
}
}

async function postTweet() {
  const isRetrograde = await getRetrograde()
  // TODO maybe move tyhis to a translation file
  T.post('statuses/update', { status: isRetrograde.isRetrograde ? 'Mercury is in retrograde' : 'Mercury is not in retrograde' })
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