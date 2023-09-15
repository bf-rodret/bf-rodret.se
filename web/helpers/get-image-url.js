import {urlFor} from '../client'
import imageSizes from '/constants/image-sizes';

export default function({imageObject, imageSize = 'small', ratio}) {
  const asset = urlFor(imageObject).fit('max').width(imageSizes[imageSize]);
  if (ratio) {
    return asset.height(imageSizes[imageSize]*ratio).url();
  }
  return asset.url()
}
