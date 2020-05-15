import React from 'react'
import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import ImageList from '../components/image-list'
import PageHeader from '../components/page-header'
import '../sass/history-images-page.scss'

export default class ImagesPage extends React.Component {
  static async getInitialProps() {
    const query = groq`*[_type == "historyImage"] {
      ...
    } | order(year)`
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
        <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
        <ImageList images={data}/>
      </Layout>
    )
  }
}
