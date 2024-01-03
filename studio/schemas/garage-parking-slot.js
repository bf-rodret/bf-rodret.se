import { ParkingSlot } from "../icons";

export default {
  title: "Garageplats",
  name: "garageParkingSlot",
  type: "document",
  preview: {
    select: {
      id: 'id',
    },
    prepare({id}) {
      return {
        title: `${id || "Garaeplats"}`,
      }
    }
  },
  icon: ParkingSlot,
  fields: [
    {
      title: "Beteckning",
      name: "id",
      type: "string",
    },
    {
      title: "Beskrivning",
      name: "description",
      type: "text",
    },
    {
      title: "Typ",
      name: "type",
      type: "string",
      options: {
        list: [
          {
            title: "Bil",
            value: "car"
          },
          {
            title: "MC",
            value: "mc"
          }
        ]
      }
    },
    {
      title: "Notering",
      name: "notes",
      type: "text",
    },
  ]
}
