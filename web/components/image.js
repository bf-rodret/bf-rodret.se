//import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import Link from 'next/link'
import '../sass/history-image.scss'
import getImageURL from '../helpers/get-image-url'

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export default class Image extends React.Component {
  render() {
    const {data, link, showcaption, imagesize = 'small'} = this.props
    
    let caption;

    if (showcaption !== false) {
      if (data.source && !link) {
        caption = <figcaption>{data.caption} <a href={data.source} target="_blank">Källa</a></figcaption>
      } else {
        caption = <figcaption>{data.caption}</figcaption>
      }
    }

    const imageUrl = getImageURL({
      imageObject: data.image,
      imageSize : imagesize
    })

    return (
      <figure className="history-image">
        <ConditionalWrapper
          condition={link}
          wrapper={children => <Link href={'/om-huset/bilder/' + data._id}><a>{children}</a></Link>}
        >
          <div className="history-image-wrapper" style={{
            backgroundImage: `url(${data.image.metadata.lqip})`,
            paddingTop: `calc(100% / ${data.image.metadata.dimensions.aspectRatio})`
           }}><img src={imageUrl}/></div>
          {caption}
          
      </ConditionalWrapper>
      </figure>
    )
  }
}

