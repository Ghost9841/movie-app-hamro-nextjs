"use client"

import type React from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" // Import toast function directly
import { useFavorites } from "../context/favorites-context"
import { YtsMovie } from "../lib/types"

interface FavoriteButtonProps {
    movie: YtsMovie
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
    const { favorites, addFavorite, removeFavorite } = useFavorites()

    const isFavorite = favorites.some((fav) => fav.id === movie.id)

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isFavorite) {
            removeFavorite(movie.id)
            toast.success("Removed from favorites", {
                description: `"${movie.title}" has been removed from your favorites.`,
            })
        } else {
            addFavorite(movie)
            toast.success("Added to favorites", {
                description: `"${movie.title}" has been added to your favorites.`,
            })
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-black/50 hover:bg-black/70 ${isFavorite ? "text-red-500" : "text-white"}`}
            onClick={toggleFavorite}
        >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
    )
}