import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'

export default class ForeningenPage extends React.Component {
  static async getInitialProps() {
    const data = await getTocDataForPageType('informationArticle');

    return {
      data: data
    }
  }

  render() {
    const {data} = this.props

    return (
      <Layout>
        <PageHeader pageTitle="Föreningen"></PageHeader>
        <MainNavigation data={data} path="/foreningen"/>
      </Layout>
    )
  }
}
