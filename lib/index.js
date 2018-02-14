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

  async sendPasswordReset(email, code, clientId, uid) {
    await send('passwordreset_v1', {email, code, clientId, uid}, this.connectionString);
  }

  async sendInvitation(email, firstName, lastName, invitationId, code) {
    await send('invitation_v1',{email, firstName, lastName, invitationId, code}, this.connectionString);
  }
}

module.exports = NotificationClient;
