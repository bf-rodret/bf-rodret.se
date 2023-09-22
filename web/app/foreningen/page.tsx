import groq from 'groq';
import {client} from 'client';
import getImageURL from 'helpers/get-image-url'
import PageHeader from 'components/page-header'
import MainNavigation from 'components/main-navigation'
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type'

export default async function Page() {

  const data = await getTocDataForPageType('informationArticle');

  return (
    <div className="page">
      <PageHeader pageTitle="Medlems&shy;information"></PageHeader>
      <MainNavigation data={data} path="/foreningen"/>
    </div>
  )
}