"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const genres = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
]

export default function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [genre, setGenre] = useState(searchParams.get("genre") || "All")

  useEffect(() => {
    setQuery(searchParams.get("query") || "")
    setGenre(searchParams.get("genre") || "All")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)

    if (query) {
      params.set("query", query)
    } else {
      params.delete("query")
    }

    if (genre && genre !== "All") {
      params.set("genre", genre)
    } else {
      params.delete("genre")
    }

    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleGenreChange = (value: string) => {
    setGenre(value)

    const params = new URLSearchParams(searchParams)

    if (value && value !== "All") {
      params.set("genre", value)
    } else {
      params.delete("genre")
    }

    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="w-full sm:w-48">
        <Select value={genre} onValueChange={handleGenreChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
