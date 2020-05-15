import Head from 'next/head'
import "../node_modules/bootstrap/scss/bootstrap.scss"
import "../sass/layout.scss"

export default props => (
  <div className={props.pageType}>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Lexend+Zetta|Montserrat:700,500|PT+Serif:400,400i&display=swap" rel="stylesheet" />
      <title>Bf Rodret UPA</title>
    </Head>
    <div className="main">
      {props.children}
    </div>
    <div className="footer">
      BF Rodret 2 U.P.A. <a href="https://goo.gl/maps/73XdpHWQQvRzo1yc7">Eldarvägen 4-6, Gröndal, 117 66 Stockholm.</a>
    </div>
  </div>
)
