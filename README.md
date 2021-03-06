# r2d2

A slack bot that checks inactivity in the channels it's been invited.

## Usage

To run the application you must set an environment variable named BOT_TOKEN with the token of the created bot. To create a bot check https://api.slack.com/bot-users. Example: $ BOT_TOKEN=444 node index.js

Each time the application is run, it will connect as the bot, check in which channels the bot has been invited, and for each of those channels will check if there has been more than 2 days of inactivity. If that's the case it will post a message to the channel asking for a status update.

You can run the application as many times as you want, ideally it should be run once a day.

To invite the bot to a channel, use the slack command invite: /invite @botname (where botname is the name of the bot as was created).

## Configuration

By default it will poke after 2 business days. The environment variable DAY_DIFF can be set to a different number.

For example: $ BOT_TOKEN=444 DAY_DIFF=4 node index.js

## TODO

* Add more messages and choose one randomly when a request for status will be posted (pokeMessages.js)
* Implement Real Time Messaging API (https://api.slack.com/rtm) so that the bot can check when a status was posted after it required one
  * This would allow in the future to add new integrations / responses / services
