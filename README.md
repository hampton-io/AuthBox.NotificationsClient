# login.dfe.notifications.client

[![Build Status](https://travis-ci.org/DFE-Digital/login.dfe.notifications.client.svg?branch=master)](https://travis-ci.org/DFE-Digital/login.dfe.notifications.client)

Client for sending user notifications within DfE Login

## Usage

Create an instance of the NotificationClient, passing the connection string for the service

```javascript
const NotificatonClient = require('login.dfe.notifications.client');
const client = new NotificatonClient({
  connectionString: '[CONNECTION-STRING-PROVIDED]'
});
```

The client then has methods for sending notifications. All methods return promises.

## Notifications

### Password reset

Send a notification when a password reset is requests

```javascript
await client.sendPasswordReset(email, code);
```

- `email` the email address of the user receiving the notification
- `code` the reset code the assigned to the user of the reset


## Running locally

Install dependencies
```
npm i
```

Run relevant test script, for example:

```
node tools/sendPasswordReset.js
```

By default, the test scripts are configured to use your local machine. If you want to use them against another connection, edit ./tools/config.json