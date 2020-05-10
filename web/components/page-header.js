import React from 'react'
import Link from 'next/link'
import "../sass/head.scss"

export default class Head extends React.Component {
  render() {
    const breadcrumbs = this.props.breadcrumbs || []
    return (
      <div className="page-header">
        <nav className="page-navigation">
          <Link href="/">
            <a className="page-navigation-main">← BF Rodret Gröndal</a>
          </Link>
          {breadcrumbs.map(breadcrumb => (
            <Link key={breadcrumb.url} href={breadcrumb.url}>
              <a>{breadcrumb.title}</a>
            </Link>
          ))}
        </nav>
        <h1 className="page-title">{this.props.pageTitle}</h1>
      </div>
    )
  }
}
