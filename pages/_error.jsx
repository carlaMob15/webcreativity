function Error({ statusCode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">
        {statusCode ? `An error ${statusCode} occurred` : 'An error occurred'}
      </h1>
      <p className="text-neutral-600">
        {statusCode === 404
          ? 'This page could not be found.'
          : 'Something went wrong. Try refreshing the page.'}
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[rgb(99,102,241)] text-white font-medium hover:opacity-90"
      >
        Go home
      </a>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
