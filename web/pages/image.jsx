import React from 'react'
import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import Image from '../components/image'
import ImageList from '../components/image-list'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'
import '../sass/history-images-page.scss'

export default class ImagePage extends React.Component {
  static async getInitialProps(context) {
    const {id} = context.query
    const selectedImageData = await client.fetch(groq`*[_type == "historyImage" && _id == $id] {
        ...,
        "image": image.asset->{
          ...
        }
      }[0]`, { id })
    const allImagesData = await client.fetch(groq`*[_type == "historyImage"] {
        ...,
        "image": image.asset->{
          ...
        }
      } | order(year)`, { id })
    const tocData = await getTocDataForPageType('historyArticle', 'bilder');

    return {
      selectedImageData, 
      allImagesData,
      tocData
    }
  }

  render() {
    const {selectedImageData, allImagesData, tocData} = this.props
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
      <Layout pageType="images-page">
        <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
        <div className="history-image-container">
          <Image data={selectedImageData} imagesize="large"/>
        </div>
        <ImageList images={allImagesData}/>
        <MainNavigation data={tocData} path="/om-huset"/>
      </Layout>
    )
  }
}
