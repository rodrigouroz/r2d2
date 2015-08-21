# r2d2

A slack bot.

## Usage

In the *config* folder there's a file named *config_example.js*. This must be used to generate a file named *config.js* (replace with the token of your bot). To create a bot check https://api.slack.com/bot-users.

Each time the application is run, it will connect as the bot, check in which channels the bot has been invited, and for each of those channels will check if there has been more than 2 days of inactivity. If that's the case it will post a message to the channel asking for a status update.

You can run the application as many times as you want, ideally it should be run once a day.

To invite the bot to a channel, use the slack command invite: /invite @botname (where botname is the name of the bot as was created).

## TODO

* Allow to configure the inactivity period (currently it's 2 days and not configurable)
* Add more messages and choose one randomly when a request for status will be posted (pokeMessages.js)
* Implement Real Time Messaging API (https://api.slack.com/rtm) so that the bot can check when a status was posted after it required one
** This would allow in the future to add new integrations / responses / services
