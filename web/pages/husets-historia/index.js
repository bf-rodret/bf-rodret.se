import React from 'react'
import groq from 'groq'
import client from '../../client'

function Article(props) {
  return (
    <div>Om huset</div>
  )
}

const query = groq`*[_type == "historyArticle"]{
  title,
  slug
}`

Article.getInitialProps = async function(context) {
  const { slug } = context.query
  return await client.fetch(query)
}

export default Article
