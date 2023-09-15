import Link from 'next/link'

export default function MainNavigation({data, path}) {
  return (
    <ul className="main-navigation">
      {data.map(page => (
        <li key={page._id}>
          <Link href={{pathname: (path || '') + '/' + page.slug.current}}>
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

