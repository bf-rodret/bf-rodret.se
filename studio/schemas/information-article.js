import richTextEditor from './rich-text-editor';
import { InfoArticle } from "../icons";

export default {
  title: "Informations-artikel",
  name: "informationArticle",
  type: "document",
  icon: InfoArticle,
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
