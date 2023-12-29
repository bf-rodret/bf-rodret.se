export default {
  title: "Bokning",
  name: "booking",
  type: "document",
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
      title: "Resurs",
      name: "resource",
      type: "reference",
      to: [
        {type: "resource"}
      ]
    },
    {
      title: "Start",
      name: "startDate",
      type: "datetime",
    },
    {
      title: "Slut",
      name: "endDate",
      type: "datetime",
    },
  ]
}
