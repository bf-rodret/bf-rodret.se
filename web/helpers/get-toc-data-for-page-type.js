import groq from 'groq'
import client from '../client'

export default async function(type, excludeId) {
  console.log(excludeId)

  const data = await client.fetch(
    groq`*[_type == "${type}"${excludeId ? ' && _id != "' + excludeId + '"' : ''}] {
      _id,
      title,
      slug
    }[0...50]`
  )

  if (type == 'historyArticle') {
    if (excludeId != 'bilder') {
      data.push({
        _id: 'bilder',
        slug: {
          _type: 'slug',
          current: 'bilder'
        },
        title: 'Bilder'
      })
    }

    if (excludeId != 'tidslinje') {
      data.push({
        _id: 'tidslinje',
        slug: {
          _type: 'slug',
          current: 'tidslinje'
        },
        title: 'Tidslinje'
      })
    }
  }

  return data
}
