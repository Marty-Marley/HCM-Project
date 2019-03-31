import Head from 'next/head'

/**
 * Custom head for next.js
 */
const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/png" href="/static/images/icon-144x144.png" />
    <link rel="apple-touch-icon" href="/static/images/icon-144x144.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="stylesheet" type="text/css" href="/static/react-datepicker.css" />
    <link rel="stylesheet" type="text/css" href="/static/geosuggest.css" />
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA2ylfU82_oPeb8JTOjOhUQQwyQizDUUc&libraries=places" />
    <link rel="manifest" href="/static/manifest.json" />
    <title>Human Management</title>
  </Head>
)

export default Meta
