import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getMovies } from "../lib/api"
import MovieGrid from "../components/movie-grid"
import Pagination from "../components/pagination"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; genre?: string }
}) {
  const query = searchParams.query || ""
  const page = Number(searchParams.page) || 1
  const genre = searchParams.genre || ""

  if (!query && !genre) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Movies</h1>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No search query</AlertTitle>
          <AlertDescription>Please enter a search term or select a genre to find movies.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const params: Record<string, any> = {
    limit: 10,
    page,
  }

  if (query) {
    params.query_term = query
  }

  if (genre) {
    params.genre = genre
  }

  const movies = await getMovies(params)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{query ? `Search results for "${query}"` : `${genre} Movies`}</h1>

      <Suspense fallback={<MovieGridSkeleton />}>
        {movies.data.movie_count > 0 ? (
          <>
            <MovieGrid movies={movies.data.movies} />

            <div className="mt-8">
              <Pagination currentPage={page} totalPages={Math.ceil(movies.data.movie_count / 10)} />
            </div>
          </>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>
              No movies match your search criteria. Try a different search term or genre.
            </AlertDescription>
          </Alert>
        )}
      </Suspense>
    </div>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}
