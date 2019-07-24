'use strict';
const Alexa = require('alexa-sdk');
const _ = require("lodash");
var jokes = [
  {
    joke: "Chuck Norris once beat Ricky Gervais in a British accent impersonation contest."
  }, {
    joke: "Chuck Norris can make a virgin go ass-to-mouth on a first date."
  }, {
    joke: "Chuck Norris solo-ed Everest in shorts and a tank-top."
  }, {
    joke: "Once, Chuck Norris held a judge in contempt, while in court."
  }, {
    joke: "The stock market monitors Chuck Norris."
  }, {
    joke: "Chuck Norris breaks the hand that feeds him."
  }, {
    joke: "The invention & benefits of acupuncture came from Chuck Norris when, while hiking in the Amazon jungle, he was cured of a migrane after 5 dozen natives shot him with 375 poison tipped darts. The skinned & scalped bodies of the dead natives were found hanging from treetops 3 days later and was the inspiration behind the 'Predator' movie series."
  }, {
    joke: "Gangsters spend all their lives living in Chuck Norris' Paradise"
  }, {
    joke: "mortal kombat is not a video game, it is a home video of Chuck Norris's 5th birthday party"
  }
]
module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      jokes
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};





module.exports.main = (event, context, callback) => {
  console.log("Alexa.main handler");

  var alexa = Alexa.handler(event, context);
  alexa.appId = undefined;

  console.log("Alexa.main: registerHandlers");

  alexa.registerHandlers(
    require('./handlers/defaultHandler'),
    require('./handlers/mainHandler')
  );

  console.log("Alexa.main: registerHandlers completed");
  alexa.execute();
  console.log("Alexa.main: registerHandlers executed");
};