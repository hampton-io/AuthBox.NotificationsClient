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

  async sendInvitation(email, firstName, lastName, invitationId) {
    await send('invitation_v1',{email, firstName, lastName, invitationId}, this.connectionString);
  }
}

module.exports = NotificationClient;
