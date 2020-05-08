import richTextEditor from './rich-text-editor';

export default {
  title: "Historik-artikel",
  name: "historyArticle",
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
      title: "Lead",
      name: "lead",
      type: "text",
    },
    richTextEditor('Text', 'body')
  ]
}
