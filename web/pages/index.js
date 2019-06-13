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

export default class ContentPage extends React.Component {

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
          </div>
          <h1 className="page-title">{data.title}</h1>
        </div>
        <div className="main-navigation">
          <a href="#">Föreningen</a>
          <a href="/om-huset">Om huset</a>
        </div>
      </Layout>
    )
  }
}
