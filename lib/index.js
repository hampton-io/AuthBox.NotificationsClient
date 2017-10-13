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

  async sendPasswordReset(email, code) {
    await send('passwordreset_v1', {email, code}, this.connectionString);
  }
}

module.exports = NotificationClient;