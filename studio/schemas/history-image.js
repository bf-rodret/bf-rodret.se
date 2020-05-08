export default {
  title: "Historik-bild",
  name: "historyImage",
  type: "document",
  fields: [
    {
      title: "Bild",
      name: "image",
      type: "image"
    },
    {
      title: "Årtal",
      name: "year",
      type: "number"
    },
    {
      title: "Beskrivning",
      name: "caption",
      type: "text"
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image'
    }
  }
}
