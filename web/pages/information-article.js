import groq from 'groq'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Image from '../components/image'
import Link from 'next/link'
import "../sass/rich-text.scss"
import "../sass/article.scss"

const query = groq`*[_type == "informationArticle" && slug.current == $slug][0]{
  title,
  lead,
  body[]{
    ...,
    "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{ 
      ...
    }
  }
}`

export default class InformationArticlePage extends React.Component {

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
          const image = props.node.historyImage
          return (
            <Image data={image} link={true}/>
          )
        }
      }
    }

    const breadcrumbs = [
      {
        'title': 'Föreningen',
        'url': '/foreningen'
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
