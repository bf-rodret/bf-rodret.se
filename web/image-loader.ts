import {config} from 'client';

export default function sanityLoader({ src, width, quality }) {
  const prj = config.projectId;
  const dataset = config.dataset;
  const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}/${src}`)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'min')
  url.searchParams.set('w', width.toString())
  if (quality) {
    url.searchParams.set('q', quality.toString())
  }
  if (src.indexOf("ratio") > 1) {
    const ratio = parseInt(url.searchParams.get("ratio") || "", 10)
    url.searchParams.set('h', Math.round((width/ratio)).toString())
  }
  return url.href
}