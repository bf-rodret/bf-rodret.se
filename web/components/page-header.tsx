import Link from 'next/link'
import {Breadcrumb} from 'types/Breadcrumb';

interface Props {
  pageTitle?: string;
  subTitle?: string;
  breadcrumbs?: Array<Breadcrumb>;
  showPageNavigation?: boolean;
}

export default function Head({pageTitle, subTitle = "", breadcrumbs = [], showPageNavigation = true}: Props) {
  return (
    <div className="page-header">
      {showPageNavigation && (
        <nav className="page-navigation">
          <span className="page-navigation-part">
            ←
            <Link className="page-navigation-main" href="/">
              BF Rodret 2 Gröndal
            </Link>
          </span>
          {breadcrumbs.map(breadcrumb => (
            <span key={breadcrumb.url} className="page-navigation-part">
              <Link href={breadcrumb.url}>
                {breadcrumb.title}
              </Link>
            </span>
          ))}
        </nav>
      )}
      <h1 className="page-title">{pageTitle}</h1>
      {subTitle && (
        <div className="page-header__subtitle">
          {subTitle}
        </div>
      )}
    </div>
  )
}
