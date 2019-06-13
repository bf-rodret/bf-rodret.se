import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import Link from 'next/link'
import "../sass/rich-text.scss"
import "../sass/article.scss"

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  title,
  body
}`

export default class ContentPage extends React.Component {

  static async getInitialProps(context) {
    const {slug} = context.query
    console.log(slug)
    return {
      data: await client.fetch(query, { slug })
    }
  }

  render() {
    const {data} = this.props
    return (
      <Layout>
        <div className="page-header">
          <nav className="page-navigation">
            <Link href="/om-huset">
              <a>← Husets historia</a>
            </Link>
          </nav>
          <h1 className="page-title">{data.title}</h1>
        </div>
        <article className="article">
          <BlockContent className="rich-text" blocks={data.body} imageOptions={{ w: 1024, h: 768, fit: 'max' }} {...client.config()}/>
        </article>
      </Layout>
    )
  }
}
