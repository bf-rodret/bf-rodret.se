import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import Article from '../components/article'
import MainNavigation from '../components/main-navigation'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'
import "../sass/article-page.scss"

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  _id,
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
    const article = await client.fetch(query, { slug })
    const tocData = await getTocDataForPageType('historyArticle', article._id);

    return {
      article,
      tocData
    }
  }

  render() {
    const {article, tocData} = this.props

    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    return (
      <Layout pageType="article-page">
        <PageHeader pageTitle={article.title} breadcrumbs={breadcrumbs}></PageHeader>
        <Article data={article}/>
        <MainNavigation data={tocData} path="/om-huset"/>
      </Layout>
    )
  }
}
