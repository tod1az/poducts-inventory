import { loadData } from "@/server/loadScript"
export default async function page() {
  return (
    <form action={loadData}>
      <button type="submit"> load</button>
    </form>
  )
}
