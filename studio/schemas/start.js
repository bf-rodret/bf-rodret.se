export default {
  title: "Startsida",
  name: "start",
  type: "document",
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      title: "Titel",
      name: "title",
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
