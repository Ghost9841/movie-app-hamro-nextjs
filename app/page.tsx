import MovieCarousel from "./components/movie-carousel"
import MovieGrid from "./components/movie-grid"
import { getMovies } from "./lib/api"


export default async function Home() {
  const latestMovies = await getMovies({ limit: 10, sort_by: "date_added" })
  const topRatedMovies = await getMovies({ limit: 10, sort_by: "rating" })

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <MovieCarousel movies={latestMovies.data.movies} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Movies</h2>
        <MovieGrid movies={latestMovies.data.movies} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Rated Movies</h2>
        <MovieGrid movies={topRatedMovies.data.movies} />
      </section>
      
    </div>
  )
}
