import React from 'react'
import groq from 'groq'
import client from '../client'
import Layout from '../components/layout'
import Image from '../components/image'
import ImageList from '../components/image-list'
import PageHeader from '../components/page-header'
import '../sass/history-images-page.scss'

export default class ImagePage extends React.Component {
  static async getInitialProps(context) {
    const {id} = context.query
    const selectedImageData = await client.fetch(groq`*[_type == "historyImage" && _id == $id] { ... }[0]`, { id })
    const allImagesData = await client.fetch(groq`*[_type == "historyImage" && _id != $id] { ... }[0...200] | order(year)`, { id })

    return {
      data: {
        selectedImageData, 
        allImagesData
      }
    }
  }

  render() {
    const {data} = this.props
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
      <Layout>
        <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
        <div className="history-image-container">
          <Image data={data.selectedImageData} imagesize="large"/>
        </div>
        <ImageList images={data.allImagesData}/>
      </Layout>
    )
  }
}
