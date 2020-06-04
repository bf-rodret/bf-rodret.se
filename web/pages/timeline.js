import React from 'react'
import groq from 'groq'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import Image from '../components/image'
import PageHeader from '../components/page-header'
import MainNavigation from '../components/main-navigation'
import getTocDataForPageType from '../helpers/get-toc-data-for-page-type.js'
import "../sass/timeline.scss"
import "../sass/rich-text.scss"

export default class TimeLinePage extends React.Component {
  static async getInitialProps() {
    const query = groq`*[_type == "timelineEvent"] {
      _id,
      year,
      story[]{
        ...,
        "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{ 
          ...,
          "image": image.asset->{
            ...
          }
        }
      }
    }[0...100] | order(year)`
    const events = await client.fetch(query)
    const tocData = await getTocDataForPageType('historyArticle', 'tidslinje');

    return {
      events,
      tocData
    }
  }

  render() {
    const {events, tocData} = this.props
    const breadcrumbs = [
      {
        'title': 'Om Huset',
        'url': '/om-huset'
      }
    ]

    const serializers = {
      types: {
        reference: props => {
          const image = props.node.historyImage
          return (
            <Image data={image} link={true} showcaption={false}/>
          )
        }
      }
    }

    return (
      <Layout pageType="timeline-page">
        <PageHeader pageTitle="Tidslinje" breadcrumbs={breadcrumbs}></PageHeader>
        <article className="timeline-article">
          <ul className="timeline">
            {events.map(event => (
              <li key={event._id} className="event">
                <div className="event-content">
                  <h2>{event.year}</h2>
                  <BlockContent className="rich-text" blocks={event.story} serializers={serializers} imageOptions={{ w: 640, h: 480, fit: 'max' }} {...client.config()}/>
                </div>
              </li>
            ))}
          </ul>
        </article>
        <MainNavigation data={tocData} path="/om-huset"/>
      </Layout>
    )
  }
}
