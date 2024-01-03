import { Member } from "../icons";

export default {
  title: "Medlem",
  name: "member",
  type: "document",
  icon: Member,
  preview: {
    select: {
      shortName: 'shortName',
      names: 'names',
      apartmentNr: 'apartmentNr',
    },
    prepare({shortName, names, apartmentNr}) {
      return {
        title: names,
        subtitle: apartmentNr ? `Lägenhet ${apartmentNr}` : ""
      }
    }
  },
  fields: [
    {
      title: "Kortnamn",
      name: "shortName",
      type: "string",
    },
    {
      title: "Namn (alla i lägenheten)",
      name: "names",
      type: "string",
    },
    {
      title: "Lägenhetsnummer",
      name: "apartmentNr",
      type: "number",
    },
    {
      title: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      title: "Notering",
      name: "notes",
      type: "text",
    },
  ]
}
