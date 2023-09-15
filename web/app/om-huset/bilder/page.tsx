import groq from 'groq'
import {client} from '/client'
import ImageList from '/components/image-list'
import PageHeader from '/components/page-header'
import MainNavigation from '/components/main-navigation'
import getTocDataForPageType from '/helpers/get-toc-data-for-page-type.js'

const query = groq`*[_type == "historyImage"] {
  ...,
  "image": image.asset->{
    ...
  }
} | order(year)`

async function getData(slug) {
  const images = await client.fetch(query)
  const tocData = await getTocDataForPageType('historyArticle', 'bilder');

  return {
    images,
    tocData
  }
}


export default async function ImagesPage() {
  const data = await getData();
  const breadcrumbs = [
    {
      'title': 'Om Huset',
      'url': '/om-huset'
    }
  ]

  return (
    <div className="images-page">
      <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
      <ImageList images={data.images}/>
      <MainNavigation data={data.tocData} path="/om-huset"/>
    </div>
  )
}
