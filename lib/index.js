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
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sendPasswordReset(email, code, clientId, uid) {
    await send('passwordreset_v1', { email, code, clientId, uid }, this.connectionString);
  }

  async sendInvitation(email, firstName, lastName, invitationId, code, serviceName, requiresDigipass, selfInvoked) {
    await send('invitation_v2', { email, firstName, lastName, invitationId, code, serviceName, requiresDigipass, selfInvoked }, this.connectionString);
  }

  async sendMigrationInvitation(email, firstName, lastName, invitationId, code) {
    await send('migrationinvite_v1', { email, firstName, lastName, invitationId, code }, this.connectionString);
  }

  async sendSupportRequest(name, email, phone, message, reference) {
    await send('supportrequest_v1', { name, email, phone, message, reference }, this.connectionString);
  }

  async sendRegisterExistingUser(email, firstName, lastName, serviceName, returnUrl) {
    await send('registerexistinguser_v1', { email, firstName, lastName, serviceName, returnUrl }, this.connectionString);
  }

  async sendRegistrationComplete(email, firstName, lastName) {
    await send('registrationcomplete_v1', { email, firstName, lastName }, this.connectionString);
  }

  async sendConfirmMigratedEmail(email, code, clientId, uid) {
    await send('confirmmigratedemail_v1', { email, code, clientId, uid }, this.connectionString);
  }
}

module.exports = NotificationClient;
