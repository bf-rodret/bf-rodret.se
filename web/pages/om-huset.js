import React from 'react'
import groq from 'groq'
import client from '../client'
import Link from 'next/link'
import Layout from '../components/layout'
import "../sass/rich-text.scss"
import "../sass/article.scss"

const query = groq`*[_type == "historyArticle"] {
  _id,
  title,
  slug
}[0...50]`

export default class Pages extends React.Component {
  static async getInitialProps() {
    return {
      data: await client.fetch(query)
    }
  }

  render() {
    const {data} = this.props

    return (
      <Layout>
        <div className="page-header">
          <nav className="page-navigation">
            <Link href="/">
              <a>← BF Rodret Gröndal</a>
            </Link>
          </nav>
          <h1 className="page-title">Om huset</h1>
        </div>

        <ul className="main-navigation">
          {data.map(page => (
            <li key={page._id}>
              <Link href={{pathname: '/om-huset/' + page.slug.current}}>
                <a>{page.title}</a>
              </Link>
            </li>
          ))}
          <li><a href="/om-huset/tidslinje">Tidslinje</a></li>
        </ul>
      </Layout>
    )
  }
}
