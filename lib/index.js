const kue = require('kue');

const send = async (type, data, connectionString) => {
  return new Promise((resolve, reject) => {
    const queue = kue.createQueue({
      redis: connectionString
    });
    queue.create(type, data)
      .save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(err);
        }
      });
  });
};

class NotificationClient {
  constructor({connectionString}) {
    this.connectionString = connectionString;
  }

  async sendPasswordReset(email, code, clientId) {
    await send('passwordreset_v1', {email, code, clientId}, this.connectionString);
  }
}

module.exports = NotificationClient;