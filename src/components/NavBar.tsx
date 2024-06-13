import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import SubmitButton from "./SubmitButton"
import Title from "./Title"

export default function NavBar() {
  const user = cookies().get("user")
  return (
    <nav className="border-b h-[4rem] flex items-center justify-center">
      <ul className="flex items-center justify-between w-[90%]">
        <Title user={user} />
        {user && (
          <form
            action={async () => {
              "use server"
              cookies().delete("user")
              redirect("/")
            }}
          >
            <SubmitButton className="p-2 rounded bg-white text-black h-[1.6rem] flex items-center justify-center">
              Cerrar session
            </SubmitButton>
          </form>
        )}
      </ul>
    </nav>
  )
}
