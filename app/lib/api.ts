import ytsApi from "./yts-api"
import type { YtsApiResponse } from "./types"

export async function getMovies(params: Record<string, any> = {}): Promise<YtsApiResponse> {
  try {
    const response = await ytsApi.get("/list_movies.json", { params })
    return response.data
  } catch (error) {
    console.error("Error fetching movies:", error)
    return {
      status: "error",
      status_message: "Failed to fetch movies",
      data: {
        movie_count: 0,
        limit: 0,
        page_number: 1,
        movies: [],
      },
      "@meta": {
        server_time: 0,
        server_timezone: "",
        api_version: 2,
        execution_time: "0 ms",
      },
    }
  }
}

export async function getMovieDetails(movieId: string): Promise<YtsApiResponse> {
  try {
    const response = await ytsApi.get("/movie_details.json", {
      params: { movie_id: movieId },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error)
    throw new Error("Failed to fetch movie details")
  }
}

export async function getMovieSuggestions(movieId: string): Promise<YtsApiResponse> {
  try {
    const response = await ytsApi.get("/movie_suggestions.json", {
      params: { movie_id: movieId },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching movie suggestions for ID ${movieId}:`, error)
    return {
      status: "error",
      status_message: "Failed to fetch movie suggestions",
      data: {
          movie_count: 0,
          movies: [],
          limit: 0,
          page_number: 0
      },
      "@meta": {
        server_time: 0,
        server_timezone: "",
        api_version: 2,
        execution_time: "0 ms",
      },
    }
  }
}
