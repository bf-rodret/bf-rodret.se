import groq from 'groq'
import {client} from 'client'
import HistoryImage from 'components/history-image'
import ImageList from 'components/image-list'
import PageHeader from 'components/page-header'
import MainNavigation from 'components/main-navigation'
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js'

const query = groq`{
  "image": 
    *[_type == "historyImage" && _id == $id] {
      ...,
      "metadata": image.asset -> { metadata }
    }[0], 
  "images": 
    *[_type == "historyImage"] | order(year) {
      ...,
      "metadata": image.asset -> { metadata }
    }
  }`

async function getData(id) {
  const data = await client.fetch(query, { id })
  const tocData = await getTocDataForPageType('historyArticle', 'bilder');

  return {
    ...data,
    tocData
  }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "historyImage"]{ _id }`);

  return pages.map((page) => ({
    id: page._id,
  }));
}

export default async function ImagePage({params}) {
  const data = await getData(params.id);
  const breadcrumbs = [
    {
      'title': 'Om Huset',
      'url': '/om-huset'
    },
    {
      'title': 'Bilder',
      'url': '/om-huset/bilder'
    }
  ];

  return (
    <div className="images-page">
      <PageHeader pageTitle="Bilder" breadcrumbs={breadcrumbs}></PageHeader>
      <div className="history-image-container">
        <HistoryImage data={data.image} imagesize="large"/>
      </div>
      <ImageList images={data.images}/>
      <MainNavigation data={data.tocData} path="/om-huset"/>
    </div>
  );
}
