import Link from 'next/link'
import SanityImage from '/components/sanity-image';
import imageSizes from '/constants/image-sizes';

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export default function Image({data, link, showcaption, imagesize = 'small'}) {
  let caption;

  if (showcaption !== false) {
    if (data.source && !link) {
      caption = <figcaption>{data.caption} <a href={data.source} target="_blank">Källa</a></figcaption>
    } else {
      caption = <figcaption>{data.caption}</figcaption>
    }
  }

  let sizeProps = {};

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
        <SanityImage image={data.image} placeholder="blur" blurDataURL={data.image.metadata.lqip} {...sizeProps}/>
        {caption}
      </ConditionalWrapper>
    </div>
  )
}
