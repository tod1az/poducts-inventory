"use server"
import { redirect } from "next/navigation"
import { login } from "./queries"
import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
  const userName = formData.get("username") as string
  console.log(userName)
  if (!userName) return redirect("/?error=400")
  const [foundUser, error] = await login(userName)
  if (error) {
    return redirect("/?error=404")
  }
  if (foundUser) {
    cookies().set("user", foundUser?.username)
    return redirect("/inventory")
  }
}
