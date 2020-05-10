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


export default class Images extends React.Component {
  static async getInitialProps() {
    const query = groq`*[_type == "historyImage"] {
      ...
    }[0...200] | order(year)`
    return {
      data: await client.fetch(query)
    }
  }

  render() {
    const {data} = this.props
    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    return (
      <Layout>
        <PageHeader pageTitle="Om huset" breadcrumbs={breadcrumbs}></PageHeader>
        <article className="images-index">
          <div className="row">
            {data.map(image => (
              <div key={image._id} className="col-md-6 col-lg-4">
                <figure className="history-image">
                  <Link href={'/om-huset/bilder/' + image._id}>
                    <a>
                      <img src={urlFor(image.image).url()}/>
                      <figcaption>{image.caption}</figcaption>
                    </a>
                  </Link>
                </figure>
              </div>
            ))}
          </div>
        </article>
      </Layout>
    )
  }
}
