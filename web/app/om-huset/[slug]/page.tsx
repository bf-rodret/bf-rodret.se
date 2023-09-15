import groq from 'groq'
import {client} from '/client'
import PageHeader from '/components/page-header'
import Article from '/components/article'
import MainNavigation from '/components/main-navigation'
import getTocDataForPageType from '/helpers/get-toc-data-for-page-type.js'

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  _id,
  title,
  lead,
  body[]{
    ...,
    "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{
      ...,
      "image": image.asset->{
        ...
      }
    }
  }
}`

async function getData(slug) {
  const article = await client.fetch(query, { slug })
  const tocData = await getTocDataForPageType('historyArticle', article._id);

  return {
    article,
    tocData
  }
}

export default async function HistoryArticlePage({params}) {

  const data = await getData(params.slug);
  const breadcrumbs = [
    {
      'title': 'Om Huset',
      'url': '/om-huset'
    }
  ]

  return (
    <div class="article-page">
      <PageHeader pageTitle={data.article.title} breadcrumbs={breadcrumbs}></PageHeader>
      <Article data={data.article}/>
      <MainNavigation data={data.tocData} path="/om-huset"/>
    </div>
  );
}
