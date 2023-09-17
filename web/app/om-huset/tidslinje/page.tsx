import groq from 'groq'
import {client} from 'client'
import HistoryImage from 'components/history-image'
import PageHeader from 'components/page-header'
import MainNavigation from 'components/main-navigation'
import getTocDataForPageType from 'helpers/get-toc-data-for-page-type.js'
import {PortableText, PortableTextTypeComponent} from "@portabletext/react";
import {HistoryImageReferenceDataType} from "types/HistoryImageReferenceData";

const query = groq`*[_type == "timelineEvent"] {
    _id,
    year,
    story[] {
      ...,
      "historyImage": *[_type=='historyImage' && _id == ^._ref][0]{ 
        ...,
        "metadata": image.asset -> { metadata }
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

  const InlineHistoryImage: PortableTextTypeComponent<HistoryImageReferenceDataType> = ({value}) => {
    return (
      <HistoryImage data={value.historyImage} link={true} showcaption={false} imagesize="forcedsmall"/>
    );
  };

  const PortableTextComponents = {
    types: {
      reference: InlineHistoryImage
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
