import groq from 'groq'
import {client} from 'client'
import PageHeader from 'components/page-header'
import Article from 'components/article'
import MainNavigation from 'components/main-navigation'
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js'

const query = groq`*[_type == "historyArticle" && slug.current == $slug][0]{
  _id,
  title,
  lead,
  body[]{
    ...,
    "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{
      ...,
      "metadata": image.asset -> { metadata }
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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "historyArticle"]{ "slug": slug.current }`);

  return pages.map((page) => ({
    slug: page.slug,
  }));
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
    <div className="article-page">
      <PageHeader pageTitle={data.article.title} breadcrumbs={breadcrumbs}></PageHeader>
      <Article data={data.article}/>
      <MainNavigation data={data.tocData} path="/om-huset"/>
    </div>
  );
}
