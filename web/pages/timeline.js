import React from 'react'
import groq from 'groq'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import Layout from '../components/layout'
import "../sass/timeline.scss"
import "../sass/rich-text.scss"

const query = groq`*[_type == "timelineEvent"] {
  _id,
  year,
  story
}[0...100] | order(year)`

export default class TimeLine extends React.Component {
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
              <a className="page-navigation-main">←  BF Rodret Gröndal</a>
            </Link>
            &nbsp;/&nbsp;
            <Link href="/om-huset">
              <a>Om huset</a>
            </Link>
          </nav>
          <h1 className="page-title">Tidslinje</h1>
        </div>
        <article className="timeline-article">
          <ul className="timeline">
            {data.map(event => (
              <li key={event._id} className="event">
                <div className="event-content">
                  <h2>{event.year}</h2>
                  <BlockContent className="rich-text" blocks={event.story} imageOptions={{ w: 640, h: 480, fit: 'max' }} {...client.config()}/>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </Layout>
    )
  }
}
