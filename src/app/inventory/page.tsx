import ProductsList from "@/components/ProductsList"
import SearchBar from "@/components/SearchBar"
import { cookies } from "next/headers"
import Link from "next/link"

type SearchParams = {
  q: string
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const userName = cookies().get("user")
  const { q } = searchParams
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {userName ? (
        <>
          <SearchBar />
          <ProductsList query={q} />
        </>
      ) : (
        <section className="flex flex-col items-center justify-center">
          <h1>Necesitas iniciar sesión para comenzar a contar</h1>
          <Link
            className="bg-blue-200 text-black rounded mb-6 py-1 px-2"
            href={"/"}
          >
            Iniciar sesión
          </Link>
        </section>
      )}
    </main>
  )
}
