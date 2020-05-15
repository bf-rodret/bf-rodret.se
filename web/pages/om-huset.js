import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'

const query = groq`*[_type == "historyArticle"] {
  _id,
  title,
  slug
}[0...50]`

export default class AboutTheHousePage extends React.Component {
  static async getInitialProps() {
    const data = await client.fetch(query);

    data.push({
      _id: 'bilder',
      slug: {
        _type: 'slug',
        current: 'bilder'
      },
      title: 'Bilder'
    })

    data.push({
      _id: 'tidslinje',
      slug: {
        _type: 'slug',
        current: 'tidslinje'
      },
      title: 'Tidslinje'
    })

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
