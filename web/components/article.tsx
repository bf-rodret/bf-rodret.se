import HistoryImage from '../components/history-image';
import {PortableText, PortableTextTypeComponent} from "@portabletext/react";
import {HistoryImageReferenceDataType} from "types/HistoryImageReferenceData";
import {ArbitraryTypedObject} from "@portabletext/types";

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

  const PortableTextComponents = {
    types: {
      reference: InlineHistoryImage
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
