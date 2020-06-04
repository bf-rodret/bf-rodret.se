import groq from 'groq'
import client from '../client'
import getImageURL from '../helpers/get-image-url'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'

const query = groq`*[_id == "start"][0]{
  title,
  "heroImage": hero.asset->{
    ...
  }
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
          <div className="hero-image-container" style={{
              backgroundImage: `url(${data.heroImage.metadata.lqip})`
            }}>
              <img
              className="hero-image"
              src={getImageURL({imageObject: data.heroImage, imageSize: 'large', ratio: 0.35})}/>
            </div>
        </div>
        <PageHeader pageTitle={data.title} showPageNavigation={false}/>
        <MainNavigation data={childPages}/>
      </Layout>
    )
  }
}
