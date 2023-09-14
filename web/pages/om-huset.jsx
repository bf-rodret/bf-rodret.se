import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'

export default class AboutTheHousePage extends React.Component {
  static async getInitialProps() {
    const data = await getTocDataForPageType('historyArticle');

    return {
      data: data
    }
  }

  render() {
    const {data} = this.props

    return (
      <Layout>
        <PageHeader pageTitle="Om huset"></PageHeader>
        <MainNavigation data={data} path="/om-huset"/>
      </Layout>
    )
  }
}
