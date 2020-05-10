import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import Link from 'next/link'
import Image from '../components/image'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}

export default class ImageList extends React.Component {
  render() {
    const {images} = this.props

    return (
      <div className="history-images-index">
        <div className="row">
          {images.map(image => (
            <div key={image._id} className="col-md-6 col-lg-4">
              <Image data={image} link={true}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
