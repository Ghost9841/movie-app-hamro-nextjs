'use client'
import { Suspense } from 'react'
import ErrorHandling from './components/ErrorCode'

function ErrorFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600">Page not found</p>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<ErrorFallback />}>
        <ErrorHandling />
      </Suspense>
    </div>
  )
}