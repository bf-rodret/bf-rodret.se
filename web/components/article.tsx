import Image from '../components/image';
import {PortableText} from "@portabletext/react";

export default function Article({data}) {
  const HistoryImage: PortableTextTypeComponent<Asset> = ({value}) => {
    return (
      <Image data={image} link={true}/>
    );
  };

  const PortableTextComponents = {
    types: {
      reference: ({value}) => {
        return (
          <Image data={value.historyImage} link={true}/>
        )
      }
    }
  };

  let Lead = ''
  if (data.lead) {
    Lead = <div className="lead">{data.lead}</div>
  }

  return (
    <article className="article">
      {Lead}
      <div className="rich-text">
        <PortableText value={data.body} components={PortableTextComponents} />
      </div>
    </article>
  )
}
