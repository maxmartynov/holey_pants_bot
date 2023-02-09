# @holey_pants_bot - Telegram Bot

This is a bot-joke that parodies my friend's frequent phrases and randomly sends them to a Telegram chat. This is just a 20 minute sketch for fun.

## Run the server

```
yarn install
yarn start
```

## Get credentials

1. Copy the env file

   ```sh
   cp .env.sample .env
   ```

2. Go to @BotFather in TG and create a new bot. Copy it's token and paste to the .env file

## How to add the bot to a TG chat

1. Add the bot to the group.
   Go to the group, click on group name, click on Add members, in the searchbox search for your bot like this: @holey_pants_bot, select the bot and click add.

2. Send a dummy message to the bot.
   You can use this example: /hello @holey_pants_bot

3. Go to following url: https://api.telegram.org/botXXX:YYYY/getUpdates
   replace XXX:YYYY with the bot token

4. Look for "chat":{"id":-zzzzzzzzzz,
   -zzzzzzzzzz is the new chat id (with the negative sign).

5. Testing: You can test sending a message to the group with a curl:

   ```
   curl -X POST "https://api.telegram.org/botXXX:YYYY/sendMessage" -d "chat_id=-zzzzzzzzzz&text=my sample text"
   ```

If you miss step 2, there would be no update for the group you are looking for. Also if there are multiple groups, you can look for the group name in the response ("title":"group_name").
