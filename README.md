# BitWallet-Bot
BitWallet transaction subscription bot

## Get Started

```
yarn
yarn start
```

process.yml example:

```
---
name            : bitwallet-bot
script          : server.js
log_date_format : YYYY-MM-DD HH:mm:ss Z
error_file      : logs/node-app.stderr.log
out_file        : logs/node-app.stdout.log
pid_file        : pids/bitwallet-bot.pid
instances       : '1'
watch           : true
merge_logs      : true
autorestart     : true
env:
  NODE_ENV      : development
  BOT_TOKEN     : 000000000:1234567890AAQWERTYUIODFGHJFGHJBNJM
  BOT_TITLE     : BitWallet
  BOT_USERNAME  : ether_wallet_bot
  PG_HOST       : 127.0.0.1
  PG_USER       : postgres
  PG_PORT       : 5432
  PG_PASSWORD   : postgres
  PG_DATABASE   : ether_wallet_bot
  PROVIDER      : wss://ropsten.infura.io/ws/v3/12345678901234567890
  BLOCK_DELAY   : 4
```

Database config at: `/db/config.sql`

Logs at: `/logs`

