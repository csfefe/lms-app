/* eslint-disable no-undef */
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  // Google login inicializalasa
  const { service, clientId, secret } = JSON.parse(Assets.getText('service-config.json'));
  ServiceConfiguration.configurations.upsert({ service }, { $set: { clientId, secret } });

  // Email kuldes inicializalasa
  const { username, password, server, port } = JSON.parse(Assets.getText('email-config.json'));
  process.env.MAIL_URL = `smtps://${username}:${password}@${server}:${port}`;

  // Email kuldes konfiguralasa
  Accounts.emailTemplates.from = 'BME VIR Portál <bmevirportal@gmail.com';
  Accounts.emailTemplates.resetPassword = {
    subject: () => 'Elfelejtett jelszó',
    text: (user, url) => {
      const newUrl = url.replace('#/reset-password/', 'reset-password#');
      return `Kedves ${user.profile.name}!\n\nÚj jelszó beállításához kattints a következő linkre: ${newUrl}`;
    },
  };
});
