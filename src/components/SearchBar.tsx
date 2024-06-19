"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setQuery((_) => newValue)
    setSearchParams(newValue)
  }

  const path = usePathname()
  const { replace } = useRouter()

  function setSearchParams(query: string) {
    const params = new URLSearchParams(searchParams)
    params.set("q", query)
    if (query === "") {
      params.delete("q")
    }
    params.set("page", "1")
    replace(`${path}?${params.toString()}`)
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-6 mb-10 ">
      <input
        onChange={handleChange}
        type="text"
        value={query}
        placeholder="Buscar..."
        className="px-2 text-black"
      />
    </form>
  )
}
