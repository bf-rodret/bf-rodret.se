export default {
  title: "Historik-bild",
  name: "historyImage",
  type: "document",
  fields: [
    {
      title: "Bild",
      name: "image",
      options: {
        metadata: ['lqip']
      },
      type: "image"
    },
    {
      title: "Årtal",
      name: "year",
      type: "number"
    },
    {
      type: 'reference',
      name: 'type',
      title: 'Type',
      to: [{type: 'historyImageType'}]
    },
    {
      title: "Beskrivning",
      name: "caption",
      type: "text"
    },
    {
      title: "Källa",
      name: "source",
      type: "url"
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image'
    }
  }
}
