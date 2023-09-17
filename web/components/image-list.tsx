import HistoryImage from 'components/history-image'

export default function ImageList({images}) {
  return (
    <div className="history-images-index">
      {images.map(image => (
        <div key={image._id}>
          <HistoryImage data={image} link={true}/>
        </div>
      ))}
    </div>
  )
}
