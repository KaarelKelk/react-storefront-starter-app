const Router = require('xdn-router/Router')
const createNextPlugin = require('xdn-next/router/createNextPlugin')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/foo/:pId', ({ render, responseHeaders }) => {
      responseHeaders({
        set: {
          productId: '{pId}',
        },
      })

      render((req, res, params) =>
        renderNext(req, res, { productId: params.pId }, '/p/[productId]')
      )
    })
    .match('/respond', ({ respond, responseHeaders }) => {
      responseHeaders({
        set: {
          'content-type': 'text/html',
        },
      })
      respond('<html><body><h1>Staatic html with status 201</h1></body></html>', 201)
    })
    .match('/favicon.ico', ({ serveStatic }) => serveStatic('public/favicon.ico'))
    .match('/redirect', ({ redirect }) => redirect('/p/5', 301))

    .match('/request-headers', ({ requestHeaders, proxy }) => {
      requestHeaders({
        set: {
          'x-upstream-header': 'custom-header',
        },
      })
      proxy('echo', { path: '/headers' })
    })

    .match('/response-headers', ({ responseHeaders, render }) => {
      responseHeaders({
        set: {
          'x-downstram-header': 'custom-header',
        },
      })

      render((req, res, params) =>
        renderNext(req, res, { productId: params.pId }, '/responseHeaders')
      )
    })

    .use(nextMiddleware)
    .fallback(({ proxy }) => {
      proxy('legacy')
    })
}
