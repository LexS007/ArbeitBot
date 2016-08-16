/**
 * Used to initialize Telegam bot
 */

const Telegram = require('node-telegram-bot-api');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const body = require('body/json');

let bot;

if (config.should_use_webhooks) {
  bot = new Telegram(config.telegram_api_key, { 
      webHook: {
        port: 8443
      },
      key: path.join(config.ssl_key_path),
      cert: path.join(config.ssl_certificate_path)
  });
  console.log(`${config.webhook_callback_url}${config.webhook_token}`);
  console.log(path.join(config.ssl_key_path));
  console.log(path.join(config.ssl_certificate_path));
  bot.setWebHook(`${config.webhook_callback_url}${config.webhook_token}`, path.join(config.ssl_certificate_path))
    .then(data => console.log('Telegram webhook is active'))
} else {
  bot = new Telegram(config.telegram_api_key, { 
    polling: true
  });
  bot.setWebHook({
    url: ''
  });
  console.log('Telegram is using updates instead of webhooks')
}

module.exports = bot;