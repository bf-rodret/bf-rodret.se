import client from '../client'
import Link from 'next/link'
import '../sass/history-image.scss'

export default class MainNavigation extends React.Component {
  render() {
    const {data, path} = this.props
    
    return (
      <ul className="main-navigation">
        {data.map(page => (
          <li key={page._id}>
            <Link href={{pathname: (path || '') + '/' + page.slug.current}}>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

