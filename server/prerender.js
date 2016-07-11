var prerenderio = Npm.require('prerender-node');
var token;
var serviceUrl;
var settings = Meteor.settings.PrerenderIO;

// token
token = process.env.PRERENDERIO_TOKEN || (settings && settings.token);

// service url (support `prerenderServiceUrl` (for historical reasons) and `serviceUrl`)
serviceUrl = settings && (settings.prerenderServiceUrl || settings.serviceUrl);
serviceUrl = process.env.PRERENDERIO_SERVICE_URL || serviceUrl;

if (token) {
  if (serviceUrl) prerenderio.set('prerenderServiceUrl', serviceUrl);
  
  // force these to be in the list
  prerenderio.crawlerUserAgents.push(['googlebot', 'yahoo', 'bingbot']);
  prerenderio.set('prerenderToken', token);

  prerenderio.set('afterRender', function afterRender(error) {
    if (error) {
      console.log('prerenderio error', error); // eslint-disable-line no-console
      return;
    }
  });

  WebApp.rawConnectHandlers.use(prerenderio);
}
