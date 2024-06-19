"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchBar() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  const [query, setQuery] = useState<string>("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setQuery((_) => newValue)
    setSearchParams(newValue)
  }

  const searchParams = useSearchParams()
  const path = usePathname()
  const { replace } = useRouter()

  function setSearchParams(query: string) {
    const params = new URLSearchParams(searchParams)
    params.set("q", query)
    if (query === "") {
      params.delete("q")
    }
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
      <button type="button">{`=>`}</button>
    </form>
  )
}
