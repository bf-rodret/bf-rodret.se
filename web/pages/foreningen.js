import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'

const query = groq`*[_type == "informationArticle"] {
  _id,
  title,
  slug
}[0...50]`

export default class AboutTheHousePage extends React.Component {
  static async getInitialProps() {
    const data = await client.fetch(query);

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
