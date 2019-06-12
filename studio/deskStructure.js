import S from "@sanity/desk-tool/structure-builder";
 
const hiddenDocTypes = listItem => ![
  "start"
].includes(listItem.getId())

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Startsida")
        .child(
          S.editor()
            .id('start')
            .schemaType("start")
            .documentId("start")
        ),
      ...S.documentTypeListItems()
        .filter(hiddenDocTypes)
    ]);
