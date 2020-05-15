const withSass = require('@zeit/next-sass')
const client = require('./client')

module.exports = withSass({
  useFileSystemPublicRoutes: false,
  // Make sure that your node enviroment supports async/await
  exportPathMap: async function (defaultPathMap) {
    const informationArticles = await client.fetch('*[_type == "informationArticle"].slug.current')
    const historyArticles = await client.fetch('*[_type == "historyArticle"].slug.current')
    const historyImages = await client.fetch(`*[_type == "historyImage"]._id`)

    const routes = {
      '/': { page: '/' },
      '/foreningen': { page: '/foreningen' },
      '/om-huset': { page: '/om-huset' },
      '/om-huset/bilder': { page: '/images' },
      '/om-huset/tidslinje': { page: '/timeline' },
    }

    Object.assign(routes, informationArticles.reduce(
      (acc, slug) => ({
        ...acc,
        [`/foreningen/${slug}`]: { page: '/information-article', query: { slug } }
      }),
      {}
    ))

    Object.assign(routes, historyArticles.reduce(
      (acc, slug) => ({
        ...acc,
        [`/om-huset/${slug}`]: { page: '/history-article', query: { slug } }
      }),
      {}
    ))

    Object.assign(routes, historyImages.reduce(
      (acc, _id) => ({
        ...acc,
        [`/om-huset/bilder/${_id}`]: { page: '/image', query: { id: _id } }
      }),
      {}
    ))

    return routes
  }
})
