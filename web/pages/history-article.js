import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import Link from 'next/link'

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
        <nav>
          <Link href="/husets-historia">
            <a>← Husets historia</a>
          </Link>
        </nav>
        <article>
          <h1>{data.title}</h1>
          <BlockContent blocks={data.body} imageOptions={{ w: 320, h: 240, fit: 'max' }} {...client.config()}/>
        </article>
      </Layout>
    )
  }
}
