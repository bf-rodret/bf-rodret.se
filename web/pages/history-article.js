import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Article from '../components/article'
import "../sass/article-page.scss"

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  title,
  lead,
  body[]{
    ...,
    "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{ 
      ...
    }
  }
}`

export default class HistoryArticlePage extends React.Component {

  static async getInitialProps(context) {
    const {slug} = context.query
    return {
      data: await client.fetch(query, { slug })
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
      <Layout pageType="article-page">
        <PageHeader pageTitle={data.title} breadcrumbs={breadcrumbs}></PageHeader>
        <Article data={data}/>
      </Layout>
    )
  }
}
