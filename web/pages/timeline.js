import React from 'react'
import groq from 'groq'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import "../sass/timeline.scss"
import "../sass/rich-text.scss"

const query = groq`*[_type == "timelineEvent"] {
  _id,
  year,
  story
}[0...100] | order(year)`

export default class TimeLinePage extends React.Component {
  static async getInitialProps() {
    return {
      data: await client.fetch(query)
    }
  }

  render() {
    const {data} = this.props
    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    return (
      <Layout>
        <PageHeader pageTitle="Tidslinje" breadcrumbs={breadcrumbs}></PageHeader>
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
