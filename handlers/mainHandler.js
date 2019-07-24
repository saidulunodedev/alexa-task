const config = require('../config.js');
const _ = require("lodash");
const rp = require('request-promise');
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
const mainHandler = {
    'LaunchRequest': function () {
        this.response.cardRenderer(config.HELP_MESSAGE);
        this.response.speak(config.HELP_MESSAGE);
        this.response.listen(config.HELP_REPROMPT);
        this.emit(':responseReady');
    },

    'GetJoke': function () {

        let RESPONSE_TEXT = "You have asked for the Joke please wait";
        // RESPONSE_TEXT = (_.sample(jokes)).joke;
        // console.log(RESPONSE_TEXT);
        // this.response.cardRenderer(RESPONSE_TEXT);
        // this.response.speak(RESPONSE_TEXT);
        // this.emit(':responseReady');
        rp(config.URL)
            .then(body => {
                console.log(body);
                const result = JSON.parse(body);

                if (result) {
                    console.log(_.sample(result), "result from responce")
                    var randomJoke = (_.sample(result)).joke;
                    RESPONSE_TEXT = randomJoke + "";
                
                    this.response.cardRenderer(RESPONSE_TEXT);
                    this.response.speak(RESPONSE_TEXT);
                    this.emit(':responseReady');
                }

            })
            .catch(err => {
                console.log("There was an error  during the request. Please try again! " + err);
                this.response.cardRenderer(RESPONSE_TEXT);
                this.response.speak(RESPONSE_TEXT);
                this.emit(':responseReady');
            });

    },

    'Unhandled': function () {
        ;
        this.response.speak("Sorry I didnt understand that. Say help if you need any assistance.");
        this.response.listen(config.HELP_REPROMPT);
        this.emit(':responseReady');
    }
};

module.exports = mainHandler;