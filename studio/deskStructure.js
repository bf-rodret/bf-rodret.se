import {
  HomeIcon,
  DocumentTextIcon,
  CogIcon,
  BookIcon,
  CalendarIcon,
  ImageIcon
} from '@sanity/icons';

const hiddenDocTypes = listItem =>
  ![
    "start",
    "informationArticle",
    "historyImageType",
    "historyArticle",
    "historyImage",
    "timelineEvent"
  ].includes(listItem.getId());

export default (S, context) => S.list().title('Content').items([

  S.listItem().title("Startsida").icon(HomeIcon).child(
    S.document().schemaType("start").documentId("start")
  ),

  S.divider(),

  S.listItem().title("Infoartiklar (för medlemmar)").icon(DocumentTextIcon).child(
    S.documentTypeList('informationArticle')
  ),

  S.divider(),

  S.listItem().title("Historikartiklar").icon(BookIcon).child(
    S.documentTypeList('historyArticle')
  ),

  S.listItem().title("Historikbilder").icon(ImageIcon).child(
    S.documentTypeList('historyImage')
  ),

  S.listItem().title("Händelser (tidslinje)").icon(CalendarIcon).child(
    S.documentTypeList('timelineEvent')
  ),

  ...S.documentTypeListItems().filter(hiddenDocTypes),

  S.divider(),

  S.listItem().title("Bildtyper").icon(CogIcon).child(
    S.documentTypeList('historyImageType')
  ),

]);