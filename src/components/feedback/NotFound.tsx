// NotFound.tsx
import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/">Go Home</Link>
    </div>
  )
}
