import Image from '../components/image'

export default class ImageList extends React.Component {
  render() {
    const {images} = this.props

    return (
      <div className="history-images-index">
        <div className="row">
          {images.map(image => (
            <div key={image._id} className="col-md-6 col-lg-4">
              <Image data={image} link={true}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
