module.exports = {
  backends: {
    legacy: {
      domainOrIp: 'www.ebay.com',
      hostHeader: 'www.ebay.com',
      firstByteTimeout: 60000,
    },
    echo: {
      domainOrIp: 'postman-echo.com',
    },
  },
}
