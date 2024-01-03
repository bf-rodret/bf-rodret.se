import * as Icon from "./icons";

const hiddenDocTypes = listItem =>
  ![
    "start",
    "informationArticle",
    "historyImageType",
    "historyArticle",
    "historyImage",
    "timelineEvent",
    "member",
    "garageParkingSlot",
    "garageParkingSlotRental"
  ].includes(listItem.getId());

export default (S, context) => S.list().title('Content').items([

  S.listItem().title("Startsida").icon(Icon.Home).child(
    S.document().schemaType("start").documentId("start")
  ),

  S.divider(),

  S.listItem().title("Infoartiklar (för medlemmar)").icon(Icon.InfoArticle).child(
    S.documentTypeList('informationArticle')
  ),

  S.divider(),

  S.listItem().title("Historikartiklar").icon(Icon.HistoryArticle).child(
    S.documentTypeList('historyArticle')
  ),

  S.listItem().title("Historikbilder").icon(Icon.HistoryImage).child(
    S.documentTypeList('historyImage')
  ),

  S.listItem().title("Händelser (tidslinje)").icon(Icon.Event).child(
    S.documentTypeList('timelineEvent')
  ),

  ...S.documentTypeListItems().filter(hiddenDocTypes),

  S.divider(),

  S.listItem().title("Garagekö + tilldelningar").icon(Icon.Queue).child(
    S.documentTypeList('garageParkingSlotRental')
  ),

  S.divider(),

  S.listItem().title("Garageplatser").icon(Icon.ParkingSlot).child(
    S.documentTypeList('garageParkingSlot')
  ),

  S.listItem().title("Medlemmar").icon(Icon.Members).child(
    S.documentTypeList('member')
  ),

  S.listItem().title("Bildtyper").icon(Icon.ImageType).child(
    S.documentTypeList('historyImageType')
  ),

]);