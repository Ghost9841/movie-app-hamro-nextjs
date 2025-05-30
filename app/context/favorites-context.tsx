"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { YtsMovie } from "@/app/lib/types"

interface FavoritesContextType {
  favorites: YtsMovie[]
  addFavorite: (movie: YtsMovie) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
})

export const useFavorites = () => useContext(FavoritesContext)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<YtsMovie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("yts-favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("yts-favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error)
      }
    }
  }, [favorites, isLoaded])

  const addFavorite = (movie: YtsMovie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((movie) => movie.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
