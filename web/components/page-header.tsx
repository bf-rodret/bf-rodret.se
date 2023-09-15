import Link from 'next/link'

export default function Head({pageTitle, subTitle = "", breadcrumbs = [], showPageNavigation}) {
  let PageNavigation = '';

  if (typeof showPageNavigation == 'undefined' || showPageNavigation == true) {
    PageNavigation = 
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
  }

  return (
    <div className="page-header">
      {PageNavigation}
      <h1 className="page-title">{pageTitle}</h1>
      {subTitle && (
        <div className="page-header__subtitle">
          {subTitle}
        </div>
      )}
    </div>
  )
}
