import Head from 'next/head'
import "../sass/layout.scss"

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:700,500|PT+Serif:400,400i&display=swap" rel="stylesheet" />
      <title>Bf Rodret UPA</title>
    </Head>
    <div className="main">
      {props.children}
      <div className="footer">
        BF Rodret UPA. <a href="https://goo.gl/maps/73XdpHWQQvRzo1yc7">Eldarvägen 4-6, Gröndal, 117 66 Stockholm.</a>
      </div>
    </div>
  </div>
)
