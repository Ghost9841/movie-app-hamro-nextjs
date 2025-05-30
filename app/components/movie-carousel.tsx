"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { YtsMovie } from "../lib/types"

interface MovieCarouselProps {
  movies: YtsMovie[]
}

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }, [movies.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }, [movies.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  if (!movies || movies.length === 0) return null

  const currentMovie = movies[currentIndex]

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[21/9] w-full relative">
        <Image
          src={currentMovie.background_image_original || currentMovie.background_image}
          alt={currentMovie.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-40 md:w-52 shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={currentMovie.medium_cover_image || "/placeholder.svg"}
                alt={currentMovie.title}
                width={300}
                height={450}
                className="w-full h-auto"
              />
            </div>

            <div className="flex-1 text-center md:text-left text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{currentMovie.title}</h2>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{currentMovie.rating}</span>
                </div>
                <span>•</span>
                <span>{currentMovie.year}</span>
                <span>•</span>
                <span>{currentMovie.runtime} min</span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {currentMovie.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="mb-6 line-clamp-3 md:line-clamp-4 text-gray-200">
                {currentMovie.summary || "No description available."}
              </p>

              <Link href={`/movies/${currentMovie.id}`}>
                <Button size="lg">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
        onClick={(e) => {
          e.preventDefault()
          prevSlide()
        }}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
        onClick={(e) => {
          e.preventDefault()
          nextSlide()
        }}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
