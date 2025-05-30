"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageParam? :string
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Limit the number of pages shown
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => router.push(createPageURL(currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant={currentPage === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => router.push(createPageURL(1))}
          >
            1
          </Button>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => router.push(createPageURL(page))}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
          <Button
            variant={currentPage === totalPages ? "default" : "outline"}
            size="sm"
            onClick={() => router.push(createPageURL(totalPages))}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => router.push(createPageURL(currentPage + 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
