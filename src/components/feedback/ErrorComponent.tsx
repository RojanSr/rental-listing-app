type ErrorProps = {
  error: unknown
}

export const ErrorComponent = ({ error }: ErrorProps) => {
  const errorMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred.'

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-600 mb-4">{errorMessage}</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </a>
    </div>
  )
}
