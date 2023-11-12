export default {
  title: "Bokningsbar Resurs",
  name: "resource",
  type: "document",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "string",
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      title: "Beskrivning",
      name: "description",
      type: "text",
    },
    {
      title: "Bokningstider börjar kl...",
      name: "slotsStart",
      type: "number",
    },
    {
      title: "Bokningstider slutar kl...",
      name: "slotsEnd",
      type: "number",
    },

  ]
}
