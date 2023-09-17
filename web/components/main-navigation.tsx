import Link from 'next/link'

type PageType = {
  _id: string;
  slug: {
    current: string;
  },
  title: string;
}

interface Props {
  data: Array<PageType>;
  path?: string;
}

export default function MainNavigation({data, path}: Props) {
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

