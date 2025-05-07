import richTextEditor from './rich-text-editor';
import {
  Event,
} from "../icons";

export default {
  title: "Händelse",
  name: "timelineEvent",
  type: "document",
  icon: Event,
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
