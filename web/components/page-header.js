import React from 'react'
import Link from 'next/link'
import "../sass/head.scss"

export default class Head extends React.Component {
  render() {
    const {pageTitle, breadcrumbs = [], showPageNavigation} = this.props
    let PageNavigation = '';

    if (typeof showPageNavigation == 'undefined' || showPageNavigation == true) {
      PageNavigation = 
        <nav className="page-navigation">
          <span className="page-navigation-part">
            ←
            <Link href="/">
              <a className="page-navigation-main">BF Rodret 2 Gröndal</a>
            </Link>
          </span>
          {breadcrumbs.map(breadcrumb => (
            <span key={breadcrumb.url} className="page-navigation-part">
              <Link href={breadcrumb.url}>
                <a>{breadcrumb.title}</a>
              </Link>
            </span>
          ))}
        </nav>
    }

    return (
      <div className="page-header">
        {PageNavigation}
        <h1 className="page-title">{pageTitle}</h1>
      </div>
    )
  }
}
