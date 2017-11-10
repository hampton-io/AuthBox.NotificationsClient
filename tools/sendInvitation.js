const utils = require('./utils');

utils.getClient()
  .then((client) => {
    client.sendInvitation('some.user@test.local', 'Test', 'User', 'New service', 'Welcome to new service', 'Welcome to new service, you can do the following.')
      .then(() => {
        console.info('Sent');
      })
      .catch((err) => {
        console.error(`Error sending - ${err}`);
      });
  })
  .catch((err) => {
    console.error(`Error getting client - ${err}`);
  });