import groq from 'groq'
import {client} from '/client'
import Image from '/components/image'
import PageHeader from '/components/page-header'
import MainNavigation from '/components/main-navigation'
import getTocDataForPageType from '/helpers/get-toc-data-for-page-type.js'
import {PortableText} from "@portabletext/react";

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

async function getData() {
  const events = await client.fetch(query)
  const tocData = await getTocDataForPageType('historyArticle', 'tidslinje');

  return {
    events,
    tocData
  }
}


export default async function TimeLinePage() {
  const data = await getData();
  const breadcrumbs = [
    {
      'title': 'Om Huset',
      'url': '/om-huset'
    }
  ];

  const HistoryImage: PortableTextTypeComponent<Asset> = ({value}) => {
    return (
      <Image data={value.historyImage} link={true} showcaption={false} imagesize="forcedsmall"/>
    );
  };

  const PortableTextComponents = {
    types: {
      reference: HistoryImage
    }
  };

  return (
    <div className="timeline-page">
      <PageHeader pageTitle="Tidslinje" breadcrumbs={breadcrumbs}></PageHeader>
      <article className="timeline-article">
        <ul className="timeline">
          {data.events.map(event => (
            <li key={event._id} className="event">
              <div className="event-content">
                <h2>{event.year}</h2>
                <div className="rich-text">
                  <PortableText value={event.story} components={PortableTextComponents} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <MainNavigation data={data.tocData} path="/om-huset"/>
    </div>
  )
}
