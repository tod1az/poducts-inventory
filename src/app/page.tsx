import SubmitButton from "@/components/SubmitButton"
import { loginAction } from "@/server/actions"
import { errors } from "@/lib/errors"
import { cookies } from "next/headers"
import Link from "next/link"

type SearchParams = {
  error: string
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const { error } = searchParams
  const user = cookies().get("user")

  if (user) {
    return (
      <main className="flex flex-col items-center gap-4 justify-center mt-10">
        <Link
          href={"/inventory"}
          className="text-2xl bg-blue-200 text-black py-2 px-4  rounded "
        >
          Continuar con el inventario
        </Link>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center gap-4 justify-center mt-10">
      <h1 className="text-2xl">Iniciar sesión</h1>
      <form
        action={async (formData) => {
          "use server"
          await loginAction(formData)
        }}
        className="flex text-center flex-col gap-4 bg-slate-500 p-2 rounded"
      >
        <label htmlFor="username">Nombre de usuario</label>
        <input
          className="rounded text-black px-2"
          name="username"
          type="text"
        />
        <SubmitButton className="bg-blue-200 text-black h-[1.6rem] rounded ">
          Entrar
        </SubmitButton>
        {error && (
          <small className="text-red-700 mb-6">{`*${errors.getLoginErrors(
            error
          )}`}</small>
        )}
      </form>
    </main>
  )
}
