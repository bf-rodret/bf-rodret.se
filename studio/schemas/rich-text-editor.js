export default function(title, name) {
  return {
    title,
    name,
    type: 'array',
    of: [
      {
        type: 'block'
      },
      {
        type: 'reference',
        title: 'Image',
        to: [{type: 'historyImage'}]
      }
    ]
  }
}
