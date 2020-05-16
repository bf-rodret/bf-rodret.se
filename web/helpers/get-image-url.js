import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

const builder = imageUrlBuilder(client)

const imageSizes = {
  large: 1200,
  small: 600,
}

export default function() {
  const {imageObject, imageSize = 'small'} = arguments[0]
  return builder.image(imageObject).fit('max').width(imageSizes[imageSize]).url()
}
