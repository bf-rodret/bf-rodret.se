import Image from '/components/image'

export default function ImageList({images}) {
  return (
    <div className="history-images-index">
      {images.map(image => (
        <div key={image._id}>
          <Image data={image} link={true}/>
        </div>
      ))}
    </div>
  )
}
