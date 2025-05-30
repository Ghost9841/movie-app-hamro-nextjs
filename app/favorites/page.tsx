"use client"

import { useEffect, useState } from "react"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useFavorites } from "../context/favorites-context"
import { YtsMovie } from "../lib/types"
import MovieGrid from "../components/movie-grid"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<YtsMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFavoriteMovies(favorites)
    setIsLoading(false)
  }, [favorites])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

      {favoriteMovies.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No favorites yet</AlertTitle>
          <AlertDescription>
            You haven&apos;t added any movies to your favorites. Browse movies and click the heart icon to add them
            here.
          </AlertDescription>
        </Alert>
      ) : (
        <MovieGrid movies={favoriteMovies} />
      )}
    </div>
  )
}
