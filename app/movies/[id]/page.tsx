import Image from "next/image"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getMovieDetails } from "@/app/lib/api"
import FavoriteButton from "@/app/components/favorite-button"

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = params.id

  try {
    const movie = await getMovieDetails(movieId)

    if (!movie.data.movie) {
      notFound()
    }

    const { movie: movieData } = movie.data

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={movieData.large_cover_image || "/placeholder.svg"}
                alt={movieData.title}
                width={500}
                height={750}
                className="w-full h-auto"
                priority
              />
              <div className="absolute top-4 right-4">
                <FavoriteButton movie={movieData} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{movieData.title_long}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{movieData.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span>{movieData.year}</span>
              <span className="text-muted-foreground">•</span>
              <span>{movieData.runtime} min</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movieData.genres.map((genre: string) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="text-muted-foreground">{movieData.description_full || "No description available."}</p>
            </div>

            {movieData.yt_trailer_code && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${movieData.yt_trailer_code}`}
                    title={`${movieData.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {movieData.torrents && movieData.torrents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Downloads</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {movieData.torrents.map((torrent: any) => (
                    <div key={torrent.hash} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {torrent.quality} {torrent.type}
                          </div>
                          <div className="text-sm text-muted-foreground">{torrent.size}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
