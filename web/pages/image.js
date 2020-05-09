import React from 'react'
import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import Layout from '../components/layout'
import Images from './images'
import "../sass/history-images.scss"

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

export default class Image extends React.Component {
  static async getInitialProps(context) {
    const query = groq`*[_type == "historyImage" && _id == $id] {
      ...
    }`
    const {id} = context.query
    return {
      data: await client.fetch(query, { id })
    }
  }

  render() {
    const {data} = this.props
    console.log(this.props)

    return (
      <Layout>
        <div className="page-header">
          <nav className="page-navigation">
            <Link href="/">
              <a className="page-navigation-main">←  BF Rodret Gröndal</a>
            </Link>
            &nbsp;/&nbsp;
            <Link href="/om-huset">
              <a>Om huset</a>
            </Link>
            &nbsp;/&nbsp;
            <Link href="/om-huset/bilder">
              <a>Bilder</a>
            </Link>
          </nav>
        </div>
        <article className="image">
          <figure className="history-image">
            <img src={urlFor(data[0].image).url()}/>
            <figcaption>{data[0].caption}</figcaption>
          </figure>
        </article>
      </Layout>
    )
  }
}
