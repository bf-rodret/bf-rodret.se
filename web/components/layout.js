import Head from 'next/head'
import "../sass/layout.scss"

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:700|PT+Serif:400,400i&display=swap" rel="stylesheet" />
      <title>Bf Rodret UPA</title>
    </Head>
    <div className="main">
      {props.children}
    </div>
  </div>
)
