import groq from 'groq';
import {client} from 'client';
import SanityImage from 'components/sanity-image';
import PageHeader from 'components/page-header';
import MainNavigation from 'components/main-navigation';
import rootPages from 'constants/root-pages.json';
import {PageType} from 'types/Page';
import {AssetType} from 'types/Asset';

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
    childPages: rootPages
  }
}

interface Props {
  title: string;
  subTitle: string;
  heroImage: AssetType;
  childPages: Array<PageType>
}

export default async function Page() {
  const data: Props = await getData();

  return (
    <div className="page">
      <div className="page-header">
        <div className="hero-image-container">
          <SanityImage image={data.heroImage} width={900} height={167} layout="fill" priority={true} alt="" />
        </div>
      </div>
      <PageHeader pageTitle={data.title} subTitle={data.subTitle} showPageNavigation={false}/>
      <MainNavigation data={data.childPages}/>
    </div>
  )
}
