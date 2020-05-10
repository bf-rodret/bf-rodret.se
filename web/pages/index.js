import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import Layout from '../components/layout'
import Link from 'next/link'

const builder = imageUrlBuilder(client)
 
function urlFor(source) {
  return builder.image(source)
}

const query = groq`*[_id == "start"][0]{
  title,
  hero
}`

export default class IndexPage extends React.Component {

  static async getInitialProps(context) {
    return {
      data: await client.fetch(query)
    }
  }

  render() {
    const {data} = this.props
    return (
      <Layout>
        <div className="page-header">
          <div className="hero-image-container">
            <img
              className="hero-image"
              src={urlFor(data.hero)
                .width(1600)
                .url()}
            />
            <h1 className="hero-title">{data.title}</h1>
          </div>
        </div>
        <ul className="main-navigation">
          <li><a href="#">Föreningen</a></li>
          <li><a href="/om-huset">Om huset</a></li>
        </ul>
      </Layout>
    )
  }
}
