import groq from 'groq'
import {client} from '/client'
import Link from 'next/link'
import PageHeader from '/components/page-header'
import MainNavigation from '/components/main-navigation'
import getTocDataForPageType from '/helpers/get-toc-data-for-page-type.js'

export default async function AboutTheHousePage() {
  const data = await getTocDataForPageType('historyArticle');

  console.log(data);

  return (
    <div className="page">
      <PageHeader pageTitle="Om huset"></PageHeader>
      <MainNavigation data={data} path="/om-huset"/>
    </div>
  );
}
