"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { YtsMovie } from "../lib/types"
import FavoriteButton from "./favorite-button"

interface MovieCardProps {
  movie: YtsMovie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
      <Link href={`/movies/${movie.id}`} className="aspect-[2/3] overflow-hidden">
        <Image
          src={movie.medium_cover_image || "/placeholder.svg"}
          alt={movie.title}
          width={300}
          height={450}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="absolute top-2 right-2">
        <FavoriteButton movie={movie} />
      </div>

      <div className="flex flex-col p-4">
        <Link href={`/movies/${movie.id}`}>
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
        </Link>

        <div className="mt-1 flex items-center text-sm text-muted-foreground">
          <span>{movie.year}</span>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-0.5" />
            <span>{movie.rating}</span>
          </div>
        </div>

        {movie.genres && (
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genres.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
