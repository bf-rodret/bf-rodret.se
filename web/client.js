const sanityClient = require('@sanity/client')

module.exports = sanityClient({
  projectId: 'bjnjq7k1', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true // `false` if you want to ensure fresh data
})
