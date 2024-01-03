import richTextEditor from './rich-text-editor';
import { HistoryArticle } from "../icons";

export default {
  title: "Historik-artikel",
  name: "historyArticle",
  type: "document",
  icon: HistoryArticle,
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {title: `${title}`}
    }
  },
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
