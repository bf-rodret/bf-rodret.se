import {
  HomeIcon,
  DocumentTextIcon,
  CogIcon,
  BookIcon,
  CalendarIcon,
  ImageIcon,
  PackageIcon,
  UserIcon,
  BulbOutlineIcon,
  InlineIcon,
  InlineElementIcon
} from '@sanity/icons';

const hiddenDocTypes = listItem =>
  ![
    "start",
    "informationArticle",
    "historyImageType",
    "historyArticle",
    "historyImage",
    "timelineEvent",
    "member",
    "resource",
    "booking",
    "garageParkingSlot",
    "garageParkingSlotRental"
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

  S.listItem().title("Händelser (tidslinje)").icon(BulbOutlineIcon).child(
    S.documentTypeList('timelineEvent')
  ),

  ...S.documentTypeListItems().filter(hiddenDocTypes),

  S.divider(),

  S.listItem().title("Bokningar").icon(CalendarIcon).child(
    S.documentTypeList('booking')
  ),

  S.listItem().title("Garage kö + tilldelningar").icon(InlineElementIcon).child(
    S.documentTypeList('garageParkingSlotRental')
  ),

  S.divider(),

  S.listItem().title("Garageplatser").icon(InlineIcon).child(
    S.documentTypeList('garageParkingSlot')
  ),

  S.listItem().title("Bokningsbara resurser").icon(PackageIcon).child(
    S.documentTypeList('resource')
  ),

  S.listItem().title("Medlemmar").icon(UserIcon).child(
    S.documentTypeList('member')
  ),

  S.listItem().title("Bildtyper").icon(CogIcon).child(
    S.documentTypeList('historyImageType')
  ),

]);