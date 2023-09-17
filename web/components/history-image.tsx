import Link from 'next/link'
import SanityImage from 'components/sanity-image';
import imageSizes from 'constants/image-sizes.json';
import {HistoryImageType} from 'types/HistoryImage';

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

interface Props {
  data: HistoryImageType;
  link?: boolean;
  showcaption?: boolean;
  imagesize?: string;
}

export default function HistoryImage({data, link, showcaption, imagesize = 'small'}: Props) {
  let caption;

  if (showcaption !== false) {
    if (data.source && !link) {
      caption = <figcaption>{data.caption} <a href={data.source} target="_blank">Källa</a></figcaption>
    } else {
      caption = <figcaption>{data.caption}</figcaption>
    }
  }

  interface Dimensions {
    width?: number;
    height?: number;
  }

  let sizeProps: Dimensions = {};

  if (imagesize == "forcedsmall") {
    sizeProps.width = imageSizes["small"].w;
    sizeProps.height = imageSizes["small"].h;
  } else {
    sizeProps.width = imageSizes[imagesize].w;
  }

  return (
    <div className="history-image">
      <ConditionalWrapper
        condition={link}
        wrapper={children => <Link href={'/om-huset/bilder/' + data._id}>{children}</Link>}
      >
        <SanityImage image={data.image} {...sizeProps}/>
        {caption}
      </ConditionalWrapper>
    </div>
  )
}
