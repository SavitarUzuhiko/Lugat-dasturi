const nodemailer = require('nodemailer');
const secret = require('./secret');

class MailService {
  async sendMail (email, activationLink) {
    await nodemailer.createTransport({
      host: secret.smtp_host,
      port: secret.smtp_port,
      secure: false,
      auth: {
        user: secret.smtp_user,
        pass: secret.smtp_password
      }
    }).sendMail({
      from: secret.smtp_user,
      to: email,
      subject: 'Activate your account',
      html : `
        <div>
          <h1>Activate your account</h1>
          <p>Click <a href="${activationLink}">here</a> to activate your account</p>
        </div>
      `
    });
  }
}

module.exports = new MailService();
