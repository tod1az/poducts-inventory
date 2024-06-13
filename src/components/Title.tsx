"use client"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Title({ user }: { user: RequestCookie | undefined }) {
  const path = usePathname()
  if (user)
    return (
      <li>
        <p className="capitalize">{user.value}</p>
      </li>
    )
  if (!user && path != "/")
    return (
      <li>
        <Link href="/">Iniciar sesión</Link>
      </li>
    )
  return <li>Bienvenido</li>
}
