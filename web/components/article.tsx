import HistoryImage from 'components/history-image';
import {PortableText, PortableTextTypeComponent} from "@portabletext/react";
import {HistoryImageReferenceDataType} from "types/HistoryImageReferenceData";
import {ArbitraryTypedObject, PortableTextBlock} from "@portabletext/types";
import slugify from "slugify";
import Link from 'next/link';

interface Props {
  data: {
    body: ArbitraryTypedObject;
    lead: string;
  }
};

export default function Article({data}) {

  const InlineHistoryImage: PortableTextTypeComponent<HistoryImageReferenceDataType> = ({value}) => {
    return (
      <HistoryImage data={value.historyImage} link={true}/>
    );
  };

  const LinkableSubHeadline: PortableTextTypeComponent<PortableTextBlock> = ({value}) => {
    console.log(value);
    const str = value.children[0].text;
    const slug = slugify(str, { 
      lower: true, 
      locale: "se"
    });
    return (
      <Link href={`#${slug}`}>
        <h2 id={slug} className="linkable">{str}</h2>
      </Link>
    );
  };

  const PortableTextComponents = {
    types: {
      reference: InlineHistoryImage
    }, 
    block: {
      "h2": LinkableSubHeadline
    }
  };

  return (
    <article className="article">
      {data.lead && (
        <div className="lead">{data.lead}</div>
      )}
      <div className="rich-text">
        <PortableText value={data.body} components={PortableTextComponents} />
      </div>
    </article>
  )
}
