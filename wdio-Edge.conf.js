const basicConfig = require('./wdio.conf')
exports.config = {
  ...basicConfig.config,
  capabilities: [
    {
        maxInstances: 3,
        browserName: 'MicrosoftEdge',
        acceptInsecureCerts: true,
    },
  ],
}