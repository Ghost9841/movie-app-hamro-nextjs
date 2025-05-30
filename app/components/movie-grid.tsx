import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { YtsMovie } from "../lib/types"
import MovieCard from "./movie-card"

interface MovieGridProps {
  movies: YtsMovie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No movies found</AlertTitle>
        <AlertDescription>No movies match your search criteria. Try a different search term or genre.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
