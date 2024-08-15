# IRH-Bot

IRH-Bot is a Telegram bot designed for J1 students in the USA who live in IRH dormitory-style housing. This bot allows you to easily check your rent and other details on the IRH website.

## Prerequisites

1. **Telegram Bot Token**: Obtain a token from [@BotFather](https://t.me/BotFather) on Telegram.
2. **Node.js**: Download and install Node.js from [here](https://nodejs.org/).
3. **Visual Studio Code**: Download and install Visual Studio Code from [here](https://code.visualstudio.com/).

4. ## Setup

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Required Libraries**: Run the following command to install the necessary libraries:
    ```
    npm install telegraf dotenv puppeteer
    ```
3. **Environment Variables**: Create a `.env` file in the root directory and add your Telegram bot token and other credentials:
    ```
    TELEGRAM_BOT_TOKEN=your telegram token
    LOGIN_USERNAME=username
    LOGIN_PASSWORD=password
    ```

    ## Running the Bot

### Locally

1. **Run the Bot**: After setting up, you can run the bot with the following command:
    ```
    node bot.js
    ```

### Remotely

If you'd like to run this bot on a remote server, here are a couple of options:

1. **Heroku**: 
    - Follow the [Heroku Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to deploy your bot on Heroku.
    - Add your environment variables to Heroku's Config Vars.

2. **Ubuntu Server**:
    - Make sure you have Node.js installed on your Ubuntu server.
    - Transfer your bot files to the server.
    - Install the necessary libraries by running `npm install`.
    - Run the bot using `node bot.js`. You may also use a process manager like PM2 to keep the bot running in the background.

## Additional Notes

- This bot is built with Node.js and can be developed using Visual Studio Code. You can easily customize or extend its functionality by editing the source code in your preferred editor.

