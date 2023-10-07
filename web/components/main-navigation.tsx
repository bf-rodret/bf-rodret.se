import Link from 'next/link'
import {BsChevronRight} from "react-icons/bs"
import {PageType} from "types/Page";

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
            <BsChevronRight/>{page.title}
          </Link>
        </li>
      ))}
      <li>
        <Link href="https://www.sbc.se/kontakt/maklarservice">
          <BsChevronRight/>Mäklarinfo
        </Link>
      </li>
    </ul>
  )
}

