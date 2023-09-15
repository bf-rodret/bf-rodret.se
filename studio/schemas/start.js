export default {
  title: "Startsida",
  name: "start",
  type: "document",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "string",
    },
    {
      title: "Underrubrik",
      name: "subTitle",
      type: "string",
    },
    {
      title: 'Hero-bild',
      type: 'image',
      options: {
        metadata: ['lqip']
      },
      name: 'hero'
    }
  ]
}
