import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import Link from 'next/link'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export default class Image extends React.Component {
  render() {
    const {data, link, showcaption} = this.props
    
    let caption;

    if (showcaption !== false) {
      if (data.source && !link) {
        caption = <figcaption>{data.caption} <a href={data.source} target="_blank">Källa</a></figcaption>
      } else {
        caption = <figcaption>{data.caption}</figcaption>
      }
    }

    return (
      <figure className="history-image">
        <ConditionalWrapper
          condition={link}
          wrapper={children => <Link href={'/om-huset/bilder/' + data._id}><a>{children}</a></Link>}
        >
          <img src={urlFor(data.image).url()}/>
          {caption}
          
      </ConditionalWrapper>
      </figure>
    )
  }
}

