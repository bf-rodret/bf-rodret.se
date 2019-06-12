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
        type: 'image',
        fields: [
          {
            type: 'text',
            name: 'caption',
            title: 'Caption',
            options: {
              isHighlighted: true
            }
          }
        ]
      }
    ]
  }
}
