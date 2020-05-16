import React from 'react'
import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import ImageList from '../components/image-list'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'
import '../sass/history-images-page.scss'

export default class ImagesPage extends React.Component {
  static async getInitialProps() {
    const query = groq`*[_type == "historyImage"] {
      ...
    } | order(year)`
    const images = await client.fetch(query)
    const tocData = await getTocDataForPageType('historyArticle', 'bilder');

    return {
      images,
      tocData
    }
  }

  render() {
    const {images, tocData} = this.props
    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    return (
      <Layout pageType="images-page">
        <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
        <ImageList images={images}/>
        <MainNavigation data={tocData} path="/om-huset"/>
      </Layout>
    )
  }
}
