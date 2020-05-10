import React from 'react'
import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
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
    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      },
      {
        'title': 'Bilder',
        'url': '/om-huset/bilder'
      }
    ]

    return (
      <Layout>
        <PageHeader pageTitle="Tidslinje" breadcrumbs={breadcrumbs}></PageHeader>
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
