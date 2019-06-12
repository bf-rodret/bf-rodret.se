import React from 'react'
import groq from 'groq'
import client from '../../client'
import Link from 'next/link'
import Layout from '../../components/layout'

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
        <nav>
          <Link href="/">
            <a>← Hem</a>
          </Link>
        </nav>
        <article>
          <div>
            <h1>Om huset</h1>
          </div>
          <ul>
            {data.map(page => (
              <li key={page._id}>
                <Link href={{pathname: '/husets-historia/' + page.slug.current}}>
                  <a>{page.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </Layout>
    )
  }
}
