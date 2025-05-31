import { Suspense } from "react"

import Pagination from "@/app/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import FilterBar from "../components/filter-bar"
import MovieGrid from "../components/movie-grid"
import { getMovies } from "../lib/api"

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string; genre?: string }>
}) {
  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams
  const page = Number(resolvedSearchParams.page) || 1
  const query = resolvedSearchParams.query || ""
  const genre = resolvedSearchParams.genre || ""

  const params: Record<string, string | number> = {
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
      <h1 className="text-3xl font-bold mb-8">Browse Movies</h1>

      <FilterBar />

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid movies={movies.data.movies} />

        <div className="mt-8">
          <Pagination currentPage={page} totalPages={Math.ceil(movies.data.movie_count / 10)} />
        </div>
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