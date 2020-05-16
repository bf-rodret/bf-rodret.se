import BlockContent from '@sanity/block-content-to-react'
import client from '../client'
import Image from '../components/image'
import "../sass/article.scss"
import "../sass/rich-text.scss"

export default class Article extends React.Component {

  render() {
    const {data} = this.props

    const serializers = {
      types: {
        reference: props => {
          const image = props.node.historyImage
          return (
            <Image data={image} link={true}/>
          )
        }
      }
    }

    return (
      <article className="article">
        <div className="lead">{data.lead}</div>
        <BlockContent className="rich-text" blocks={data.body} serializers={serializers} {...client.config()}/>
      </article>
    )
  }
}
