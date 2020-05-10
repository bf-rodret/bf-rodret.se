import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import "../sass/rich-text.scss"
import "../sass/article.scss"

const query = groq`*[_type == "historyArticle"] {
  _id,
  title,
  slug
}[0...50]`

export default class AboutTheHousePage extends React.Component {
  static async getInitialProps() {
    return {
      data: await client.fetch(query)
    }
  }

  render() {
    const {data} = this.props

    return (
      <Layout>
        <PageHeader pageTitle="Om huset"></PageHeader>

        <ul className="main-navigation">
          {data.map(page => (
            <li key={page._id}>
              <Link href={{pathname: '/om-huset/' + page.slug.current}}>
                <a>{page.title}</a>
              </Link>
            </li>
          ))}
          <li><a href="/om-huset/bilder">Bilder</a></li>
          <li><a href="/om-huset/tidslinje">Tidslinje</a></li>
        </ul>
      </Layout>
    )
  }
}
