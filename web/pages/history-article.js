import groq from 'groq'
import client from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Link from 'next/link'
import "../sass/rich-text.scss"
import "../sass/article.scss"

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  title,
  lead,
  body[]{
    ...,
    "historyImage": *[_type=='historyImage' && _id == ^._ref]{ 
      ...
    }
  }
}`

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

export default class ContentPage extends React.Component {

  static async getInitialProps(context) {
    const {slug} = context.query
    return {
      data: await client.fetch(query, { slug })
    }
  }

  render() {
    const {data} = this.props

    const serializers = {
      types: {
        reference: props => {
          const imageArticle = props.node.historyImage[0]
          return (
            <figure className="history-image">
              <Link href={'/om-huset/bilder/' + imageArticle._id}>
                <a>
                  <img src={urlFor(imageArticle.image).url()}/>
                  <figcaption>
                    {imageArticle.caption}
                  </figcaption>
                </a>
              </Link>
            </figure>
          )
        }
      }
    }

    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    return (
      <Layout pageType="article-page">
        <PageHeader pageTitle={data.title} breadcrumbs={breadcrumbs}></PageHeader>
        <article className="article">
          <div className="lead">{data.lead}</div>
          <BlockContent className="rich-text" blocks={data.body} serializers={serializers} {...client.config()}/>
        </article>
      </Layout>
    )
  }
}
