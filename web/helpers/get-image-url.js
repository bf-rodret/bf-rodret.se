import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

const builder = imageUrlBuilder(client)

const imageSizes = {
  large: 1200,
  small: 600,
}

export default function() {
  const {imageObject, imageSize = 'small', ratio} = arguments[0]
  const asset = builder.image(imageObject).fit('max').width(imageSizes[imageSize]);
  if (ratio) {
    return asset.height(imageSizes[imageSize]*ratio).url();
  }
  return asset.url()
}
