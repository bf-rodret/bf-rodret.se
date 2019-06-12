import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

function Article(props) {
  return (
    <article>
      <h1>{props.title}</h1>
      <BlockContent blocks={props.body} imageOptions={{ w: 320, h: 240, fit: 'max' }} {...client.config()}/>
    </article>
  )
}

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  title,
  body
}`

Article.getInitialProps = async function(context) {
  const { slug } = context.query
  return await client.fetch(query, { slug })
}

export default Article
