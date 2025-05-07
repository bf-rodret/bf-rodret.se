import {
  BookedParkingSlot,
  Queued
} from "../icons";

export default {
  title: "Garage kö + tilldelning",
  name: "garageParkingSlotRental",
  type: "document",
  orderings: [
    {
      title: "Kötid",
      name: "queueTime",
      by: [
        {field: 'queueDate', direction: 'asc'},
      ]
    }
  ],
  preview: {
    select: {
      garageParkingSlot: 'garageParkingSlot.id',
      name: 'member.names',
      queueDate: 'queueDate'
    },
    prepare({name, lastName, garageParkingSlot, queueDate}) {
      let description = "";
      let icon = BookedParkingSlot;

      if (garageParkingSlot) {
        description = `Tilldelad plats ${garageParkingSlot}`
      } else {
        const d = new Date(queueDate);
        const formattedDate = d.toLocaleDateString("sv-SE", {
          year: "numeric",
          month: "long"
        });
        description = `Kö sedan ${formattedDate}`; 
        icon = Queued;
      }

      return {
        title: `${name || ""}`,
        subtitle: description,
        media: icon
      }
    }
  },
  fields: [
    {
      title: "Medlem",
      name: "member",
      type: "reference",
      to: [
        {type: "member"}
      ]
    },
    {
      title: "Garageplats",
      name: "garageParkingSlot",
      type: "reference",
      to: [
        {type: "garageParkingSlot"}
      ],
      options: {
        disableNew: true
      }
    },
    {
      title: "Köstart",
      name: "queueDate",
      type: "date",
    },
    {
      title: "Byte",
      name: "switchDate",
      type: "date",
    },
    {
      title: "Tillträde",
      name: "startDate",
      type: "date",
    }
  ]
}
