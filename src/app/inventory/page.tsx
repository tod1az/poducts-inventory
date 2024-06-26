import ProductsList from "@/components/ProductsList"
import SearchBar from "@/components/SearchBar"
import { cookies } from "next/headers"
import Link from "next/link"

type SearchParams = {
  q: string
  page: string
  f: string
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const userName = cookies().get("user")
  const { q, page, f } = searchParams
  return (
    <main className="w-[100vw]  py-24">
      {userName ? (
        <section className="w-full border-white flex items-center justify-center flex-col">
          <SearchBar />
          <ProductsList query={q} page={page} family={f} />
        </section>
      ) : (
        <section className="flex flex-col  items-center justify-center">
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
