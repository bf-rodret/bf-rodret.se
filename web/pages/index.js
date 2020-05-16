import groq from 'groq'
import client from '../client'
import getImageURL from '../helpers/get-image-url'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'

const query = groq`*[_id == "start"][0]{
  title,
  hero
}`

export default class IndexPage extends React.Component {

  static async getInitialProps() {
    return {
      data: await client.fetch(query),
      childPages: [
        {
          _id: 'foreningen',
          slug: {
            _type: 'slug',
            current: 'foreningen'
          },
          title: 'Föreningen'
        },
        {
          _id: 'om-huset',
          slug: {
            _type: 'slug',
            current: 'om-huset'
          },
          title: 'Om huset'
        },
      ]
    }
  }

  render() {
    const {data, childPages} = this.props

    return (
      <Layout>
        <div className="page-header">
          <div className="hero-image-container">
            <img
              className="hero-image"
              src={getImageURL({imageObject: data.hero, imageSize: 'large'})}
            />
          </div>
        </div>
        <PageHeader pageTitle={data.title} showPageNavigation={false}/>
        <MainNavigation data={childPages}/>
      </Layout>
    )
  }
}
