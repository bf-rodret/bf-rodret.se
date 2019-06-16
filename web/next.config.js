const withSass = require('@zeit/next-sass')
const client = require('./client')

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  // Make sure that your node enviroment supports async/await
  exportPathMap: async function (defaultPathMap) {
    const path = await client
      // get all the history articles and return those with slugs
      .fetch('*[_type == "historyArticle"].slug.current')
      .then(function(data) {
        // use reduce to build an object with routes
        // and select the history-article.js file
        const routes = data.reduce(
          (acc, slug) => ({
            '/': { page: '/' },
            '/om-huset': { page: '/om-huset' },
            '/om-huset/tidslinje': { page: '/timeline' },
            ...acc,
            [`/om-huset/${slug}`]: { page: '/history-article', query: { slug } }
          }),
          {}
        )
        return routes
      })
      .catch(console.error)
    return path
  }
})
