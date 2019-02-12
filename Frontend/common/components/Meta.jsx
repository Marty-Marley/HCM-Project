import Head from 'next/head'

/**
 * Custom head for next.js
 */
const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    {/* <link rel="manifest" href="/static/manifest.json" /> */}
    <title>HCM</title>
  </Head>
)

export default Meta