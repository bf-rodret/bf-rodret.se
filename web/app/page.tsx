import groq from 'groq';
import {client} from 'client';
import SanityImage from 'components/sanity-image';
import PageHeader from 'components/page-header';
import MainNavigation from 'components/main-navigation';

const query = groq`*[_id == "start"][0]{
  title,
  subTitle,
  "heroImage": hero {
    ...,
    "metadata": image.asset -> { metadata }
  }
}`

async function getData() {
  const heroImageData = await client.fetch(query);
  return {
    ...heroImageData,
    childPages: [
      {
        _id: 'foreningen',
        slug: {
          _type: 'slug',
          current: 'foreningen'
        },
        title: 'Föreningen'
      },
      {
        _id: 'om-huset',
        slug: {
          _type: 'slug',
          current: 'om-huset'
        },
        title: 'Om huset'
      },
    ]
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="page">
      <div className="page-header">
        <div className="hero-image-container">
          <SanityImage image={data.heroImage} width={900} height={315} layout="fill" priority={true} />
        </div>
      </div>
      <PageHeader pageTitle={data.title} subTitle={data.subTitle} showPageNavigation={false}/>
      <MainNavigation data={data.childPages}/>
    </div>
  )
}
