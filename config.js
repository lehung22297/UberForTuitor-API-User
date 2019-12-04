module.exports = {
  facebookAuth: {
    clientID: "440333676888106",
    clientSecret: "0fc3157f9bba91b8f8c475b44c519b25",
    callback_url: "http://localhost:3001/api/auth/facebook/callback",
    profileURL:
      "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email"
  },

//   twitterAuth: {
//     consumerKey: "your-consumer-key-here",
//     consumerSecret: "your-client-secret-here",
//     callbackURL: "http://localhost:4000/auth/twitter/callback"
//   },

//   googleAuth: {
//     clientID: "your-clientID-here",
//     clientSecret: "your-client-secret-here",
//     callbackURL: "http://localhost:4000/auth/google/callback"
//   }
};
