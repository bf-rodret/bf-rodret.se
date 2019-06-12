import richTextEditor from './rich-text-editor';

export default {
  title: "Händelse",
  name: "timelineEvent",
  type: "document",
  fields: [
    {
      title: "Årtal",
      name: "year",
      type: "number"
    },
    richTextEditor('Händelse', 'story')
  ],
  preview: {
    select: {
      year: 'year',
    },
    prepare(selection) {
      const {year} = selection
      return {title: `${year}`}
    }
  }
}
