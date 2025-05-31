import ytsApi from "./yts-api"
import type { YtsApiResponse } from "./types"
import {  AxiosError } from "axios"

// Helper function to safely log axios errors
function logAxiosError(error: AxiosError) {
  if (error.response) {
    // Server responded with error status
    console.error("API Error Response:", {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
      url: error.config?.url,
      method: error.config?.method
    })
  } else if (error.request) {
    // No response was received
    console.error("No response received:", {
      url: error.config?.url,
      method: error.config?.method,
      timeout: error.config?.timeout,
      code: error.code,
      message: error.message
    })
  } else {
    // Something else caused the error
    console.error("Error setting up request:", error.message)
  }
}

export async function getMovies(params: Record<string, string | number> = {}): Promise<YtsApiResponse> {
  try {
    const response = await ytsApi.get("/list_movies.json", { params })
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching movies:`)
      logAxiosError(error)
    } else {
      console.error(`Unknown error fetching movies`, error)
    }

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
  }
  catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching movie details for ID ${movieId}:`)
      logAxiosError(error)
    } else {
      console.error(`Unknown error fetching movie details for ID ${movieId}:`, error)
    }
    // Return fallback data instead of throwing
    return {
      status: "error",
      status_message: "Failed to fetch movie details",
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

export async function getMovieSuggestions(movieId: string): Promise<YtsApiResponse> {
  try {
    const response = await ytsApi.get("/movie_suggestions.json", {
      params: { movie_id: movieId },
    })
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`Error fetching movie details for ID ${movieId}:`)
      logAxiosError(error)
    } else {
      console.error(`Unknown error fetching movie details for ID ${movieId}:`, error)
    }
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