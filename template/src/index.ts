import { handleRequest } from 'edgeside'

addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request, {
      // you can add your own custom elements here:
      // elements: [['foo', FooElementHandler]],
      //
      // you can also add URL rewrite rules
      // urlRewriteRules: [
      //   ['examples/elements/graphql/.*/example3', 'examples/elements/graphql/example3'],
      // ],
    }),
  )
})
