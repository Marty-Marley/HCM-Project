import Router from 'next/router'

export default (context, destination) => {
  if (context.res) {
    // If on server
    context.res.writeHead(303, { Location: destination })
    context.res.end()
  } else {
    // If on client
    Router.replace(destination)
  }
}
