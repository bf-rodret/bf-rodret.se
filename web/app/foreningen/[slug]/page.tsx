import groq from 'groq';
import {client} from 'client';
import PageHeader from 'components/page-header';
import Article from 'components/article';
import MainNavigation from 'components/main-navigation';
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js';
import {Breadcrumb} from 'types/Breadcrumb';

const query = groq`*[_type == "informationArticle" && slug.current == $slug][0]{
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

async function getData(slug: string) {
	const article = await client.fetch(query, { slug })
	const tocData = await getTocDataForPageType('informationArticle', article._id);

	return {
	  article,
	  tocData
	}
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "informationArticle"]{ "slug": slug.current }`);

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function InformationArticlePage({params}) {
  const { slug } = params;
	const data = await getData(slug);
  const breadcrumbs: Array<Breadcrumb> = [
    {
      'title': 'Medlemsinformation',
      'url': '/foreningen'
    }
  ]

  return (
  	<div className="article-page">
	    <PageHeader pageTitle={data.article.title} breadcrumbs={breadcrumbs}></PageHeader>
	    <Article data={data.article}/>
	    <MainNavigation data={data.tocData} path="/foreningen"/>
	  </div>
  )

}
